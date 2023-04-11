import { test } from '@japa/runner';
import Ingredient from 'App/Models/Ingredient';
import Merchant from 'App/Models/Merchant';

test.group('Order', () => {
  test('Test order validation', async ({ assert, client }) => {
    const response = await client.post('/api/v1/auth/login')
                      .header('Accept', 'application/json')
                      .form({
                        email: 'testmerchant@xyz.com',
                        password: '12345678'
                      })

    assert.isTrue(response.body().hasOwnProperty('accessToken'));
    assert.isTrue(response.body().hasOwnProperty('user'));

    const token = response.body().accessToken.token;
    const merchant = await Merchant.find(response.body().user.id);

    assert.isTrue(merchant?.isMerchant === 1);

    const orderResponse = await client.post('/api/v1/order/product')
                      .header('Accept', 'application/json')
                      .header('Authorization', `Bearer ${token}`)
                      .json({
                        products: [
                            {
                                product_id: 'string',
                                quantity: 2
                            },
                            {
                                product_id: 1,
                                quantity: 'string'
                            }
                        ]
                      });

      assert.isTrue(orderResponse.body().hasOwnProperty('errors'));
  });

  test('Test order', async ({ assert, client }) => {
    const response = await client.post('/api/v1/auth/login')
                      .header('Accept', 'application/json')
                      .form({
                        email: 'testmerchant@xyz.com',
                        password: '12345678'
                      })

    assert.isTrue(response.body().hasOwnProperty('accessToken'));
    assert.isTrue(response.body().hasOwnProperty('user'));

    const token = response.body().accessToken.token;
    const merchant = await Merchant.find(response.body().user.id);

    assert.isTrue(merchant?.isMerchant === 1);

    let oldIngredients: Ingredient[] | undefined = await merchant?.related('ingredients')
                                                    .query().exec();

    const orderResponse = await client.post('/api/v1/order/product')
                      .header('Accept', 'application/json')
                      .header('Authorization', `Bearer ${token}`)
                      .json({
                        products: [
                            {
                                product_id: 1,
                                quantity: 2
                            },
                            {
                                product_id: 1,
                                quantity: 3
                            }
                        ]
                      });

      assert.isTrue(orderResponse.body().hasOwnProperty('code'));
      assert.isTrue(orderResponse.body().hasOwnProperty('data'));

      const data = orderResponse.body().data;
      data.forEach(element => {
        assert.isTrue(element.is_successful);
      });

      oldIngredients?.forEach( async element => {
        let ingredient = await merchant?.related('ingredients').query()
                                  .where('id', element.id).first();
        assert.isTrue(element.quantityAvailable !== ingredient?.quantityAvailable);
      });
  });
})
