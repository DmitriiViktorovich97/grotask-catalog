<script setup lang="ts">
import VxCrumbs from "../components/UI/VxCrumbs.vue";
import CardSummary from "../components/Form/CardSummary.vue";
import VxItemCheckbox from "../components/UI/VxItemCheckbox.vue";

const { items, allSelected, toggleAll, clear } = useCart()
</script>

<template>
  <div class="container page">
    <VxCrumbs :items="[{ title: 'Корзина' }]" />

    <div class="grid">
      <section class="list">
        <div class="head">
          <h1 class="head__title">Корзина</h1>
          <span class="head__badge">{{ items.length }} шт</span>
        </div>

        <div class="tools">
          <VxItemCheckbox
              class="pill"
              :model-value="allSelected"
              @update:model-value="toggleAll"
              aria-label="Выбрать все"
          >
            <span class="pill-hide">Выбрать все</span>
          </VxItemCheckbox>

          <button class="pill" @click="clear">
            <img src="/trash.svg" alt="trash">
            Очистить корзину
          </button>
        </div>

        <p v-if="pending" class="empty">Загрузка…</p>
        <p v-else-if="error" class="empty">
          Не удалось загрузить корзину. <button @click="refresh()">Повторить</button>
        </p>
        <ul v-else-if="items.length" class="items">
          <CartItem v-for="it in items" :key="it.id" :item="it" />
        </ul>
        <p v-else class="empty">Корзина пуста</p>
      </section>

      <CardSummary/>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 12px;
  border-top: 2px solid var(--c-line);
}

.grid {
  display: flex;
  gap: var(--col-gap);
  align-items: flex-start;
  margin-top: 12px;
}

.list {
  flex: 1;
  min-width: 0;
}

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
  padding-top: 20px;
  padding-bottom: 12px;
}

.head__title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.head__badge {
  padding: 3px 7px;
  border-radius: 12px;
  background: var(--c-pill);
  font-size: 11px;
  color: var(--c-muted);
}

.tools {
  display: flex;
  gap: 8px;
}

/* СТИЛИ ДЛЯ ПИЛЮЛЬ */
.pill {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  background: var(--c-pill);
  font-size: 14px;
  font-weight: 700;
  border: none;
}

.items {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  border-bottom: 1px solid var(--c-line);
}

.empty {
  margin: 40px 0;
  color: var(--c-muted);
  font-size: 14px;
}

@media (max-width: 768px) {
  .grid {
    flex-direction: column;
    align-items: stretch;
  }

  .grid > :deep(.side) {
    width: 100%;
  }

  .pill-hide {
    display: none;
  }
}
</style>