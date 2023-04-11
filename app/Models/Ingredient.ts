import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Merchant from 'App/Models/Merchant'
import Product from 'App/Models/Product'
import ReorderNotification from 'App/Models/ReorderNotification'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  // This is needed because the merchant extends the user model
  @column({ columnName: 'user_id'})
  public merchantId: number

  @column()
  public name: string

  @column()
  public quantityAvailable: number

  @column()
  public quantitySupplied: number

  @column()
  public quantityStocked: number

  @column()
  public lastReorderAt: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Merchant)
  public merchant: BelongsTo<typeof Merchant>

  @manyToMany(() => Product, {
    relatedKey: 'id',
    pivotForeignKey: 'ingredient_id',
    pivotRelatedForeignKey: 'product_id',
    pivotTable: 'product_ingredients',
    pivotColumns: ['id', 'quantity']
  })
  public products: ManyToMany<typeof Product>

  @column()
  public pivotQuantity: number

  @hasMany(() => ReorderNotification)
  public reorderNotifications: HasMany<typeof ReorderNotification>

  public static async isMerchantNotifiedForReorder(ingredient: Ingredient): Promise<boolean>
  {
    const ingredientExists = await Ingredient.$getRelation('reorderNotifications')
                        .relatedModel()
                        .query()
                        .where('ingredient_id', ingredient.id)
                        .where('last_reorder_at', ingredient.lastReorderAt)
                        .first()

    if (!ingredientExists) {
      return false
    }

    return true
  }

  public static isDueForReorder(ingredient: Ingredient): boolean
  {
      const half = ingredient.quantityStocked / 2
      const diff = ingredient.quantityStocked - ingredient.quantityAvailable

      return half <= diff
  }
}
