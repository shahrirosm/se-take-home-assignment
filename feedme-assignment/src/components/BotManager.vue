<script lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useBotStore, type Bot } from '@/stores/bot'

export default {
  setup() {
    const botStore = useBotStore()
    const timerRef = ref<number>()
    const currentTime = ref(Date.now())

    const activeBots = computed(() => botStore.bots.filter((bot) => bot.isProcessing).length)
    const idleBots = computed(() => botStore.bots.filter((bot) => !bot.isProcessing).length)

    const remainingTime = (bot: Bot) => {
      if (!bot.startTime || !bot.isProcessing) return 0
      const elapsed = (currentTime.value - bot.startTime) / 1000
      return Math.max(0, Math.ceil(10 - elapsed))
    }
    onMounted(() => {
      timerRef.value = window.setInterval(() => {
        currentTime.value = Date.now()
      }, 1000)
    })

    // Clean up timer
    onUnmounted(() => {
      if (timerRef.value) {
        clearInterval(timerRef.value)
      }
    })

    return {
      createBot: botStore.createBot,
      destroyBot: botStore.destroyBot,
      bots: botStore.bots,
      activeBots,
      idleBots,
      remainingTime,
    }
  },
}
</script>

<template>
  <div class="bot-manager">
    <div class="controls-section">
      <div class="bot-controls">
        <button @click="createBot" class="control-btn add-btn">+ Bot</button>
        <button @click="destroyBot" :disabled="bots.length === 0" class="control-btn remove-btn">
          - Bot
        </button>
      </div>
      <div class="bot-summary">
        <p>Total Bots: {{ bots.length }}</p>
        <p>Active: {{ activeBots }}</p>
        <p>Idle: {{ idleBots }}</p>
      </div>
    </div>

    <div class="bot-list">
      <table>
        <thead>
          <tr>
            <th>Bot ID</th>
            <th>Status</th>
            <th>Current Order</th>
            <th>Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bot in bots" :key="bot.id" :class="{ 'bot-busy': bot.isProcessing }">
            <td>Bot #{{ bot.id }}</td>
            <td>
              <span class="status-badge" :class="bot.isProcessing ? 'status-busy' : 'status-idle'">
                {{ bot.isProcessing ? 'BUSY' : 'IDLE' }}
              </span>
            </td>
            <td>
              {{ bot.currentOrderId ? `Order #${bot.currentOrderId}` : '-' }}
            </td>
            <td>
              {{ bot.isProcessing ? `${remainingTime(bot)}s` : '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.bot-manager {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #000;
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.bot-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn {
  background-color: #28a745;
  color: white;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
}

.control-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.bot-summary {
  display: flex;
  gap: 20px;
}

.bot-summary p {
  margin: 0;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background-color: #e9ecef;
  font-weight: bold;
}

.bot-busy {
  background-color: #fff3e0;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: bold;
}

.status-idle {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-busy {
  background-color: #ffebee;
  color: #c62828;
}
</style>
