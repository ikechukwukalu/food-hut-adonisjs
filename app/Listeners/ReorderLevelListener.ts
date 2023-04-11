import Event from '@ioc:Adonis/Core/Event'
import Ingredient from 'App/Models/Ingredient'
import ReorderNotification from "App/Models/ReorderNotification"
import Merchant from "App/Models/Merchant"
import ReorderLevelNotification from "App/Mailers/ReorderLevelNotification"

Event.on('merchant:reorderlevel', async (ingredient: Ingredient) => {
  if (await Ingredient.isMerchantNotifiedForReorder(ingredient)) {
    return
  }

  if (!Ingredient.isDueForReorder(ingredient)) {
    return
  }

  ReorderNotification.create({
    userId: ingredient.userId,
    ingredientId: ingredient.id,
    quantityLeft: ingredient.quantityAvailable,
    lastReorderAt: ingredient.lastReorderAt
  })

  const merchant = await Merchant.find(ingredient.userId)
  if (merchant) {
    await new ReorderLevelNotification(merchant, ingredient).sendLater()
  }
})
