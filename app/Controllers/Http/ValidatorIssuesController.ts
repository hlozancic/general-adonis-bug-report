import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ValidatorIssuesController {
  public async emptyQouteString({ request, response }: HttpContextContract) {
    const bodyBeforeValidator = request.body()

    const validatorSchema = schema.create({
      stringOptional: schema.string.optional(),
      stringNullableAndOptional: schema.string.nullableAndOptional(),
    })

    const bodyAfterValidator = await request.validate({ schema: validatorSchema })

    response.ok({
      bodyBeforeValidator,
      bodyAfterValidator,
    })
  }
}
