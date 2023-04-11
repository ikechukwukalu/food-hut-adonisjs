import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Merchant from 'App/Models/Merchant'
import Ingredient from 'App/Models/Ingredient'

export default class ReorderNotification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public ingredientId: number

  @column()
  public quantityLeft: number

  @column()
  public lastReorderAt: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Merchant)
  public merchant: BelongsTo<typeof Merchant>

  @belongsTo(() => Ingredient)
  public ingredients: BelongsTo<typeof Ingredient>
}
