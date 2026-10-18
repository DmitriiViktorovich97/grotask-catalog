<script setup lang="ts">
const { items, allSelected, toggleAll, clear } = useCart()
</script>

<template>
  <div class="container page">
    <nav class="crumbs" aria-label="Навигация">
      <NuxtLink to="/" class="crumbs__home" aria-label="Главная">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>
      </NuxtLink>
      <span class="crumbs__sep">›</span>
      <span class="crumbs__cur">Корзина</span>
    </nav>

    <div class="grid">
      <section class="list">
        <div class="head">
          <h1 class="head__title">Корзина</h1>
          <span class="head__badge">{{ items.length }} шт</span>
        </div>

        <div class="tools">
          <button class="pill" @click="toggleAll">
            <span class="pill__box" :class="{ on: allSelected }" />
            Выбрать все
          </button>
          <button class="pill" @click="clear">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3"/></svg>
            Очистить корзину
          </button>
        </div>

        <ul v-if="items.length" class="items">
          <CartItem v-for="it in items" :key="it.id" :item="it" />
        </ul>
        <p v-else class="empty">Корзина пуста</p>
      </section>

      <CartSummary />
    </div>
  </div>
</template>

<style scoped>
.page { padding-top: 12px; }

.crumbs { display: flex; align-items: center; gap: 8px; height: 28px; font-size: 11px; }
.crumbs__home { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--c-pill); color: #777; }
.crumbs__sep { color: #b3b6bd; }
.crumbs__cur { font-weight: 500; }

.grid { display: flex; gap: var(--col-gap); align-items: flex-start; margin-top: 12px; }
.list { flex: 1; min-width: 0; }

.head { display: flex; align-items: center; gap: 8px; }
.head__title { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.01em; }
.head__badge { padding: 3px 7px; border-radius: 8px; background: var(--c-pill); font-size: 9px; color: var(--c-muted); }

.tools { display: flex; gap: 8px; margin-top: 12px; }
.pill { display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: var(--radius-sm); background: var(--c-pill); font-size: 11px; }
.pill__box { width: 14px; height: 14px; border: 1px solid #aab0bb; border-radius: 3px; background: #fff; }
.pill__box.on { background: var(--c-text); border-color: var(--c-text); }

.items { list-style: none; margin: 12px 0 0; padding: 0; }
.empty { margin: 40px 0; color: var(--c-muted); font-size: 14px; }

@media (max-width: 860px) {
  .grid { flex-direction: column; }
  .grid > :deep(.side) { width: 100%; }
}
</style>
