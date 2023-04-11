import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Merchant from 'App/Models/Merchant'
import Product from 'App/Models/Product'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public productId: number

  @column()
  public quantity: number

  @column({ serialize: (value: number) => {
      return value === 1 ? true : false
    }
  })
  public isSuccessful: number | boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Merchant)
  public merchant: BelongsTo<typeof Merchant>
}
