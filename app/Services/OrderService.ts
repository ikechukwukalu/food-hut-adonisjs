import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Product from "App/Models/Product"
import Ingredient from "App/Models/Ingredient"
import Order from "App/Models/Order"
import Event from '@ioc:Adonis/Core/Event'

type ORDER = {
  product_id: number,
  quantity: number
} | undefined

/**
 * Add Order To Collection.
 *
 * @param  Array<any> validated
 * @return Map<number, \App\Models\ORDER>
 */
export const addOrderToCollection = (validated: Array<any>): Map<number, ORDER> => {
  const collection = new Map()

  validated.map((ele: ORDER) => {
    if (ele !== undefined) {
      if (collection.has(ele.product_id)) {
        ele.quantity = ele.quantity + collection.get(ele.product_id).quantity
      }

      collection.set(ele.product_id, ele)
    }
  })

  return collection
}

/**
 * Filter ProductIDs.
 *
 * @param Map<number, \App\Models\ORDER> collection
 * @return Array<number>
 */
export const filterProductIDs = (collection: Map<number, ORDER>): Array<number> => {
  return Array.from(collection.keys())
}

/**
 * Get Products.
 *
 * @param Array<number> productIDs
 * @return Promise<\App\Model\Product[]>
 */
export const getProducts = async (productIDs: Array<number>): Promise<Product[]> => {
  return await Product.query().whereIn('id', productIDs).exec()
}

/**
 * Get Orders.
 *
 * @param \App\Models\Product[] products
 * @param Map<number, \App\Models\ORDER> collection
 * @param AuthContract auth
 * @return Promise<\App\Models\Order[]>
 */
export const getOrders = async (products: Product[], collection: Map<number, ORDER>, auth: AuthContract): Promise<Order[]> => {
  return await Promise.all(
    products.map(async (product: Product) => {
      return await processOrder(product, collection, auth)
    })
  )
}

/**
 * Get Order Row.
 *
 * @param \App\Models\Product product
 * @param Map<number, \App\Models\ORDER> collection
 * @return \App\Models\ORDER
 */
const getOrderRow = (product: Product, collection: Map<number, ORDER>): ORDER => {
  return collection.get(product.id)
}

/**
 * Get Product Ingredients.
 *
 * @param \App\Models\Product product
 * @param Map<number, \App\Models\ORDER> collection
 * @return Promise<\App\Models\Ingredient[]|null>
 */
const getProductIngredients = async (product: Product, collection: Map<number, ORDER>): Promise<Ingredient[]|null> => {
  const row: ORDER = getOrderRow(product, collection)
  const ingredients = await product.related('ingredients').query()
        .pivotColumns(['quantity']).exec()

  const isQuantityOkay = ingredients.every((ingredient: Ingredient) => {
    if (row !== undefined) {
      const quantity = row.quantity * ingredient.pivotQuantity
      return ingredient.quantityAvailable > quantity
    }

    return false
  })

  if (!isQuantityOkay) {
    return null
  }

  return ingredients
}

/**
 * Save Order.
 *
 * @param \App\Models\Product product
 * @param Map<number, \App\Models\ORDER> collection
 * @param AuthContract auth
 * @param \bool status
 * @return Promise<\App\Models\Order>
 */
const saveOrder = async (product: Product, collection: Map<number, ORDER>, auth: AuthContract, status: boolean = true): Promise<Order> => {
  const row: ORDER = getOrderRow(product, collection)

  return await Order.create({
    userId: auth.use('api').user?.id,
    productId: product.id,
    quantity: row?.quantity,
    isSuccessful: status ? 1 : 0
  })
}

/**
 * Process Order.
 *
 * @param \App\Models\Product product
 * @param Map<number, \App\Models\ORDER> collection
 * @param AuthContract auth
 * @return Promise<\App\Models\Order>
 */
const processOrder = async (product: Product, collection: Map<number, ORDER>, auth: AuthContract): Promise<Order> =>
{
  const ingredients = await getProductIngredients(product, collection)

  if (ingredients === null) {
      return await saveOrder(product, collection, auth, false)
  }

  ingredients.map(async (ingredient: Ingredient) => {
    await updateIngredientQuantity(product, collection, ingredient)
  })

  return await saveOrder(product, collection, auth)
}

/**
 * Update Ingredient Quantity.
 *
 * @param \App\Models\Product product
 * @param Map<number, \App\Models\ORDER> collection
 * @param \App\Models\Ingredient ingredient
 * @return Promise<void>
 */
const updateIngredientQuantity = async (product: Product, collection: Map<number, ORDER>, ingredient: Ingredient): Promise<void> => {
  const row: ORDER = getOrderRow(product, collection)

  if (row !== undefined) {
    const quantityTaken = row.quantity * ingredient.pivotQuantity

    await ingredient.merge({
        quantityAvailable: ingredient.quantityAvailable - quantityTaken,
        lastReorderAt: ingredient.lastReorderAt
    }).save()
  }

  //Dispatch event
  Event.emit('merchant:reorderlevel', ingredient)
}
