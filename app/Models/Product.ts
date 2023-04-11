import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Merchant from 'App/Models/Merchant'
import Order from 'App/Models/Order'
import Ingredient from 'App/Models/Ingredient'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order)
  public orders: HasMany<typeof Order>

  @belongsTo(() => Merchant)
  public merchant: BelongsTo<typeof Merchant>

  @manyToMany(() => Ingredient, {
    relatedKey: 'id',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'ingredient_id',
    pivotTable: 'product_ingredients',
    pivotColumns: ['id', 'quantity']
  })
  public ingredients: ManyToMany<typeof Ingredient>

  @column()
  public pivotQuantity: number
}
