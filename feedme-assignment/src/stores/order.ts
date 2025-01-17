import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Order {
  id: number
  type: 'normal' | 'VIP'
  status: 'pending' | 'processing' | 'complete'
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const orderId = ref<number>(1)

  function addOrder(type: 'normal' | 'VIP') {
    const newOrder: Order = {
      id: orderId.value++,
      type: type,
      status: 'pending',
    }

    if (type === 'VIP') {
      const normalIndex = orders.value.findIndex((order) => order.type === 'normal')
      if (normalIndex !== -1) {
        orders.value.splice(normalIndex, 0, newOrder)
      } else {
        orders.value.push(newOrder)
      }
    } else {
      orders.value.push(newOrder)
    }
  }

  function completeOrder(order: Order) {
    order.status = 'complete'
  }
  
  const pendingOrders = computed((): Order[] =>
    orders.value.filter((order) => order.status === 'pending' || order.status === 'processing'),
  )

  const completedOrders = computed((): Order[] =>
    orders.value.filter((order) => order.status === 'complete'),
  )

  return { orders, orderId, addOrder, completeOrder, pendingOrders, completedOrders }
})
