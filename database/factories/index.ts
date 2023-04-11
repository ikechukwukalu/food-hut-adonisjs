import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import moment from 'moment'
import crypto from 'crypto'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      email_verified_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      remember_me_token: crypto.randomBytes(20).toString('hex'),
    }
  })
  .build()
