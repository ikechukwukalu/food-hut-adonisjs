import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'LoginController.login').as('login');
    Route.post('/logout', 'LogoutController.logout').as('logout')
    .middleware('auth:api');
  })
  .prefix('/auth');
})
.prefix('/api/v1');
