import { scope, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Order from 'App/Models/Order'
import Ingredient from 'App/Models/Ingredient'
import Product from 'App/Models/Product'
import ProductIngredient from 'App/Models/ProductIngredient'
import ReorderNotification from 'App/Models/ReorderNotification'

export default class Merchant extends User {
  public static table = 'users'

  @hasMany(() => Order, {
    localKey: 'id',
    foreignKey: 'userId'
  })
  public orders: HasMany<typeof Order>

  @hasMany(() => Ingredient)
  public ingredients: HasMany<typeof Ingredient>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => ProductIngredient)
  public productIngredients: HasMany<typeof ProductIngredient>

  @hasMany(() => ReorderNotification)
  public reorderNotifications: HasMany<typeof ReorderNotification>

  public static merchant = scope((query) => {
    query.where('is_merchant', true)
  })
}
