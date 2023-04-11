import { schema, rules as schemaRules, validator } from '@ioc:Adonis/Core/Validator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

const AUTHORIZE = (): boolean => {
  return true
}

const RULES = (): any => {
  return schema.create({
    email: schema.string({ trim: true }, [
      schemaRules.email(),
      schemaRules.exists({ table: 'users', column: 'email' })
    ]),
    password: schema.string({ trim: true }, [
      schemaRules.minLength(8),
      schemaRules.maxLength(150)
    ]),
  })
}

export default class LoginRequest {
  public static validate = async (request: RequestContract): Promise<any> => {
    if (AUTHORIZE() === false) {
      return {
        errors: 'Unauthorized'
      }
    }

    return await request.validate({
      schema: RULES(),
      reporter: validator.reporters.api, //For APIs
    })
  }
}
