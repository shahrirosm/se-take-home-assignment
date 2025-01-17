import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useOrderStore } from './order'

export interface Bot {
  id: number
  isProcessing: boolean
  currentOrderId: number | null
  startTime: number | null
  timeoutId?: NodeJS.Timeout
}

export const useBotStore = defineStore('bot', () => {
  const bots = ref<Bot[]>([])
  const botId = ref<number>(1)

  function createBot() {
    const newBot: Bot = {
      id: botId.value++,
      isProcessing: false,
      currentOrderId: null,
      startTime: null,
    }

    bots.value.push(newBot)
    processOrders(newBot)
  }

  function destroyBot() {
    const orderStore = useOrderStore()
    const orders = orderStore.orders
    const bot = bots.value.pop()
    if (bot?.isProcessing) {
      const orderId = bot.currentOrderId
      if (orderId) {
        const orderIndex = orders.findIndex((order) => order.id === orderId)
        if (orderIndex !== -1) {
          orders[orderIndex].status = 'pending'
        }

        if (bot.timeoutId) {
          clearTimeout(bot.timeoutId)
        }
      }

      bot.isProcessing = false
      bot.currentOrderId = null
    }
  }

  function processOrders(bot: Bot) {
    if (bot.isProcessing) return

    const orderStore = useOrderStore()
    const order = orderStore.pendingOrders.find((order) => order.status === 'pending')

    if (!order) return

    // Avoid bots processing same order
    const isBeingProcessed = bots.value.some((otherBot) => otherBot.currentOrderId === order.id)
    if (isBeingProcessed) return

    bot.isProcessing = true
    bot.currentOrderId = order.id
    bot.startTime = Date.now()
    order.status = 'processing'

    bot.timeoutId = setTimeout(() => {
      orderStore.completeOrder(order)
      bot.isProcessing = false
      bot.currentOrderId = null
      bot.startTime = null
      processOrders(bot)
    }, 10000)
  }

  watch(
    () => useOrderStore().pendingOrders,
    () => {
      // Assign pending orders to idle bots
      bots.value.filter((bot) => !bot.isProcessing).forEach((bot) => processOrders(bot))
    },
  )

  return { bots, botId, createBot, destroyBot }
})
