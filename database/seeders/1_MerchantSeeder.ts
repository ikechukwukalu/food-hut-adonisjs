import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Merchant from 'App/Models/Merchant'
import moment from 'moment'
import crypto from 'crypto'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Merchant.firstOrCreate(
    {
      email: 'testmerchant@xyz.com'
    },
    {
      name: 'Test Merchant',
      email: 'testmerchant@xyz.com',
      emailVerifiedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      password: '12345678',
      rememberMeToken: crypto.randomBytes(20).toString('hex'),
      isMerchant: true,
    })
  }
}
