import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/product', 'OrdersController.order').as('order');
    })
    .prefix('/order');
  })
  .middleware('auth:api');
})
.prefix('/api/v1');
