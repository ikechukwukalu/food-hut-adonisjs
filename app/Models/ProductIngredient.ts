import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Merchant from 'App/Models/Merchant';

export default class ProductIngredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public productId: number

  @column()
  public ingredientId: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Merchant)
  public merchant: BelongsTo<typeof Merchant>
}
