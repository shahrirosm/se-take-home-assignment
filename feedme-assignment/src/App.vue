<template>
  <div id="app">
    <div class="controls">
      <button @click="addOrder('normal')" class="btn normal">New Normal Order</button>
      <button @click="addOrder('VIP')" class="btn vip">New VIP Order</button>
    </div>

    <BotManager />

    <div class="orders-container">
      <OrderList title="Pending Orders" :orders="pendingOrders" />
      <OrderList title="Completed Orders" :orders="completedOrders" />
    </div>
  </div>
</template>

<script lang="ts">
import { useOrderStore } from './stores/order'
import BotManager from './components/BotManager.vue'
import OrderList from './components/OrderList.vue'
import { computed } from 'vue'

export default {
  components: { BotManager, OrderList },
  setup() {
    const orderStore = useOrderStore()

    const pendingOrders = computed(() => orderStore.pendingOrders)
    const completedOrders = computed(() => orderStore.completedOrders)

    return { addOrder: orderStore.addOrder, pendingOrders, completedOrders }
  },
}
</script>

<style scoped>
.controls {
  margin: 20px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.normal {
  background-color: #e3f2fd;
  color: #1976d2;
}

.btn.normal:hover {
  background-color: #bbdefb;
}

.btn.vip {
  background-color: #fff3e0;
  color: #f57f17;
}

.btn.vip:hover {
  background-color: #ffe0b2;
}

.orders-container {
  display: flex;
  gap: 20px;
  margin: 20px;
}

.orders-container > * {
  flex: 1;
}
</style>
