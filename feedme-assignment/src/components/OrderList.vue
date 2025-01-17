<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Order } from '@/stores/order';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    orders: {
      type: Array as PropType<Order[]>,
      required: true
    }
  }
});
</script>

<template>
  <div class="order-list">
    <h3>{{ title }}</h3>
    <ul>
      <li
        v-for="order in orders"
        :key="order.id"
        :class="{
          'vip': order.type === 'VIP',
          'processing': order.status === 'processing'
        }"
      >
        <div class="order-info">
          <span class="order-type">{{ order.type }}</span>
          Order #{{ order.id }}
        </div>
        <span class="status-badge" :class="`status-${order.status}`">
          {{ order.status.toUpperCase() }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.order-list li {
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
}

.vip {
  background-color: #fff3e0;
  color: #000;
  border-color: #ffb74d !important;
}

.processing {
  background-color: #e3f2fd;
  border-color: #64b5f6 !important;
}

.status-badge {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8em;
  background-color: #eee;
}
</style>
