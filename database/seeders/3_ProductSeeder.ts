import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Merchant from 'App/Models/Merchant'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const merchant = await Merchant.findBy('email', 'test@example.com')

    if (merchant) {
      await Product.firstOrCreate(
        {
          name: 'Burger'
        },
        {
          userId: merchant.id,
          name: 'Burger',
        })
    }

  }
}
