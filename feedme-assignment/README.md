# feedme-assignment

# Bot Order Processing System

A Vue.js application that simulates a bot-based order processing system. The application demonstrates real-time order management with normal and VIP priority queues, managed by a configurable number of processing bots.

## 🚀 Live Demo

[Live Demo](https://food-order-three-rho.vercel.app) <!-- Add your deployed app URL -->

## How It Works

1. **Orders**
   - Users can create Normal or VIP orders
   - VIP orders are automatically prioritized in the queue
   - Orders progress through states: pending → processing → complete

2. **Bots**
   - Each bot processes one order at a time
   - Processing time is set to 10 seconds per order
   - Bots automatically pick up new orders when idle
   - Multiple bots can work simultaneously

3. **Queue Management**
   - Orders are processed in FIFO order with VIP priority
   - Real-time updates of order status
   - Visual distinction between normal and VIP orders

## Technical Stack

- Vue 3
- TypeScript
- Pinia (State Management)
- CSS3 with scoped styling


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
