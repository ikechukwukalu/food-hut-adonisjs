import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import I18n from '@ioc:Adonis/Addons/I18n'
import Merchant from 'App/Models/Merchant'
import Ingredient from 'App/Models/Ingredient'

export default class ReorderLevelNotification extends BaseMailer {
  constructor (private merchant: Merchant, private ingredient: Ingredient) {
    super()
  }

  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "ReorderLevelNotification.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject(I18n.locale('en').formatMessage('order.mail.subject'))
      .from(Env.get('SMTP_USERNAME'))
      .to(this.merchant.email)
      .htmlView('emails/welcome', {
        user: this.merchant,
        introduction: I18n.locale('en').formatMessage('order.mail.introduction', {name: this.merchant.name}),
        message: I18n.locale('en').formatMessage('order.mail.message', {name: this.ingredient.name}),
        action: I18n.locale('en').formatMessage('order.mail.action'),
        complimentaryClose: I18n.locale('en').formatMessage('order.mail.complimentary_close'),
        url: Env.get('APP_URL'),
      })
  }
}
