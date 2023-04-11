import { schema, rules as schemaRules, validator } from '@ioc:Adonis/Core/Validator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

const AUTHORIZE = (): boolean => {
  return true
}

const RULES = (): any => {
  return schema.create({
    products: schema.array().members(
      schema.object().members({
        product_id: schema.number([
          schemaRules.exists({ table: 'products', column: 'id' })
        ]),
        quantity: schema.number(),
      })
    )
  })
}

export default class OrderRequest {
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
