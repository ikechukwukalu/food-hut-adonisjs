import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Merchant from 'App/Models/Merchant';
import Ingredient from 'App/Models/Ingredient';
import moment from 'moment';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const merchant = await Merchant.findBy('email', 'test@example.com');

    if (merchant) {
      Ingredient.firstOrCreate(
          {name: 'Beef'},
          {
              name: 'Beef',
              quantityAvailable: 20000,
              quantitySupplied: 20000,
              quantityStocked: 20000,
              userId: merchant.id,
              lastReorderAt: moment().format('YYYY-MM-DD HH:mm:ss')
          });

      Ingredient.firstOrCreate(
          {name: 'Cheese'},
          {
              name: 'Cheese',
              quantityAvailable: 5000,
              quantitySupplied: 5000,
              quantityStocked: 5000,
              userId: merchant.id,
              lastReorderAt: moment().format('YYYY-MM-DD HH:mm:ss')
          });

      Ingredient.firstOrCreate(
          {name: 'Onion'},
          {
              name: 'Onion',
              quantityAvailable: 1000,
              quantitySupplied: 1000,
              quantityStocked: 1000,
              userId: merchant.id,
              lastReorderAt: moment().format('YYYY-MM-DD HH:mm:ss')
          });
    }
  }
}
