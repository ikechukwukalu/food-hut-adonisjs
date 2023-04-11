import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { UserFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await UserFactory
    .merge({
      email: 'test@example.com',
      password: '12345678',
      name: 'Test user',
    })
    .create();
    await UserFactory.createMany(10);
  }
}
