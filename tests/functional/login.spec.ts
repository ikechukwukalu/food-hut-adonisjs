import { test } from '@japa/runner';

test.group('Login', () => {
  test('Test user login validation', async ({ assert, client }) => {
    const response = await client.post('/api/v1/auth/login')
                      .header('Accept', 'application/json')
                      .form({
                        email: 'testmerchantxyz.com',
                        password: '12345678'
                      })

    assert.isTrue(response.body().hasOwnProperty('errors'));
  });

  test('Test user login', async ({ assert, client }) => {
    const response = await client.post('/api/v1/auth/login')
                      .header('Accept', 'application/json')
                      .form({
                        email: 'testmerchant@xyz.com',
                        password: '12345678'
                      })

    assert.isTrue(response.body().hasOwnProperty('accessToken'));
    assert.isTrue(response.body().hasOwnProperty('user'));
  });
})
