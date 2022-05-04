import { test } from '@japa/runner'

test.group('Validator issues', () => {
  test('Check empty string issue on form submission', async ({ client }) => {
    // @virk this test works as expeded
    const response = await client.post('/validatorIssues/emptyQouteString').form({
      stringOptional: '',
      stringNullableAndOptional: '',
    })

    response.dumpBody()

    response.assertBody({
      // body before should have null values due to convertEmptyStringsToNull in config/bodyparser set to true
      bodyBeforeValidator: {
        stringOptional: null,
        stringNullableAndOptional: null,
      },
      // we expect here to have null as a value of stringNullableAndOptional, because null value is allowed
      bodyAfterValidator: {
        stringNullableAndOptional: null,
      },
    })
  })

  test('Check empty string issue on json submission', async ({ client }) => {
    // @virk here we have a problem with validator...
    // convertEmptyStringsToNull will not fire for application/json
    const response = await client.post('/validatorIssues/emptyQouteString').json({
      stringOptional: '',
      stringNullableAndOptional: '',
    })

    response.dumpBody()

    response.assertBody({
      // body before should have empty qoutes as values due to convertEmptyStringsToNull not working on application/json
      bodyBeforeValidator: {
        stringOptional: '',
        stringNullableAndOptional: '',
      },
      // I would expect here to have empty strings then in payload too, but we get empty object for bodyAfterValidator
      bodyAfterValidator: {
        stringOptional: '',
        stringNullableAndOptional: '',
      },
    })
  })
})
