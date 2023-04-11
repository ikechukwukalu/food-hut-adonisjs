import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Merchant from 'App/Models/Merchant'
import Product from 'App/Models/Product'
import Ingredient from 'App/Models/Ingredient'

const PRODUCT_INGREDIENTS = {
  beef: 150,
  cheese: 30,
  onion: 20,
}

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const product = await Product.findBy('name', 'Burger')
    const merchant = await Merchant.query()
          .withScopes((scopes) => scopes.merchant())
          .where('email', 'testmerchant@xyz.com')
          .first()

    if (!(product && merchant)) {
      return
    }

    const ingredients = await Ingredient.all()

    await Promise.all(ingredients.map(async (ingredient: Ingredient) => {
      const productIngredients = await product.related('ingredients').query()
              .wherePivot('ingredient_id', ingredient.id).first()

      if (!productIngredients) {
        await product.related('ingredients').attach({
          [ingredient.id]: {
            quantity: PRODUCT_INGREDIENTS[ingredient.name.toLowerCase()],
            user_id: merchant.id
          }
        })
      }
    }))
  }
}
