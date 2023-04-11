import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutsController {
  public async logout({ auth }: HttpContextContract)
  {
    const USER = auth.use('api');

    await USER.revoke();

    if (USER.isLoggedOut) {
      return {
        user: null,
      }
    }

    return {
      user: USER
    }
  }

}
