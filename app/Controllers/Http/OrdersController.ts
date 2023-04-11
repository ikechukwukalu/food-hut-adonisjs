import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import OrderRequest from 'App/Requests/OrderRequest';
import I18n from '@ioc:Adonis/Addons/I18n';
import {
  addOrderToCollection,
  filterProductIDs,
  getProducts,
  getOrders
} from 'App/Services/OrderService';

export default class OrdersController {
  public async order({ auth, request }: HttpContextContract)
  {
    const payload = await OrderRequest.validate(request);
    if (payload.hasOwnProperty('errors')) {
      return payload;
    }

    const collection = addOrderToCollection(payload['products']);
    const productIDs = await filterProductIDs(collection);
    const products = await getProducts(productIDs);

    if (products.length === 0) {
      return {
        success: false, error: true, code: 422,
        data: {
          message: I18n.locale('en').formatMessage('order.no_product')
        }
      }
    }

    return {
      success: true, error: false, code: 200,
      data: await getOrders(products, collection, auth)
    };
  }
}
