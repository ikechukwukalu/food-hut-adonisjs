import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginRequest from 'App/Requests/LoginRequest';

export default class LoginController {
  public async login({ auth, request }: HttpContextContract)
  {
    const payload = await LoginRequest.validate(request);
    if (payload.hasOwnProperty('errors')) {
      return payload;
    }

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return {
        accessToken: token,
        user: auth.use('api').user
      }
    } catch {
      return {
        errors: 'Invalid credentials'
      }
    }
  }
}
