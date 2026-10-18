<script setup lang="ts">
import { useRoute } from 'vue-router'
import VxInput from "../UI/VxInput.vue";

// Достаем все необходимые реактивные данные и методы из нашего хранилища
const { goodsTotal, discount, payTotal, selected, promo, applyPromo, promoApplied, promoDiscount, promoError } = useCart()
const { goToCheckout } = useCustomRoute()
const promoOpen = ref(true)

const route = useRoute()
const emit = defineEmits(['submit'])
</script>

<template>
  <aside class="side">
    <section class="card">
      <h2 class="card__title">Ваша корзина:</h2>
      <dl class="lines">
        <div class="line">
          <dt>{{ selected.length }} товаров</dt>
          <dd>{{ formatRub(goodsTotal) }}</dd>
        </div>
        <!-- Скидка магазина (разница между старой и новой ценой товаров) -->
        <div class="line">
          <dt>Скидка</dt>
          <dd class="red">−{{ formatRub(discount) }}</dd>
        </div>
        <div class="line line--total">
          <dt>Итого:</dt>
          <dd>{{ formatRub(payTotal) }}</dd>
        </div>
      </dl>
      <!-- Кнопка видна только на странице корзины (переход на оформление) -->
      <button class="checkout" :disabled="!selected.length" @click="goToCheckout" v-if="route.path === '/'">
        К оформлению
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </button>
      <!-- Кнопка видна только на странице оформления (отправка заказа) -->
      <button class="checkout" :disabled="!selected.length" @click="emit('submit')" v-if="route.path === '/checkout'" >
        Оформить заказ
      </button>
    </section>

    <section class="promo">
      <button class="promo__head" :aria-expanded="promoOpen" @click="promoOpen = !promoOpen">
        <span class="promo__label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
          Промокод
        </span>
        <svg class="promo__chev" :class="{ 'is-open': promoOpen }" width="10" height="10" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <!-- Если промокод применен, показываем успех и кнопку отмены -->
      <div v-show="promoOpen" class="promo__body">
        <div v-if="promoApplied" class="promo__success">
          <p class="promo__ok">Промокод GROWTASK2026 применен!</p>
          <button class="promo__cancel" @click="promoApplied = false; promo = ''">Отменить</button>
        </div>

        <template v-else>
          <VxInput v-model="promo" label="Промокод" placeholder="Введите промокод"/>
          <button class="apply" @click="applyPromo">Применить</button>
          <p v-if="promoError" class="promo__error">{{ promoError }}</p>
        </template>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.side {
  width: var(--sidebar-w);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: flex-start;
  top: 16px;
  position: sticky;
}

.card {
  padding: 16px;
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: 0 2px 20px rgba(17, 17, 17, 0.07), 0 0 0 1px rgba(17, 17, 17, 0.03);
}

.card__title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
}

.lines {
  margin: 0 0 14px;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-bottom: 2px solid var(--c-line);
  font-size: 11px;
}

.line dt, .line dd {
  margin: 0;
}

.line dt {
  color: #666;
}

.line dd {
  font-weight: 600;
}

.line .red {
  color: var(--c-red);
}

.line--total {
  border-bottom: 0;
  padding-top: 9px;
  font-size: 16px;
}

.line--total dt {
  color: var(--c-text);
  font-weight: 600;
}

.line--total dd {
  font-weight: 700;
}

.promo__error {
  margin: 0;
  font-size: 11px;
  color: var(--c-red); /* Красный цвет для ошибки */
}

.promo__success {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: #e6f4ea;
  border-radius: var(--radius-sm);
}

.promo__success .promo__ok {
  color: #1f9d55;
  margin: 0;
  font-weight: 600;
}

.promo__cancel {
  background: none;
  border: none;
  color: #666;
  font-size: 11px;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.promo__cancel:hover {
  color: var(--c-red);
}

.checkout {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-sm);
  background: var(--c-red);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
}

.checkout:hover {
  background-color: var(--c-icon-price);
}

.checkout:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.promo {
  padding: 0 2px;
}

.promo__head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;
}

.promo__label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
}

.promo__chev {
  transition: transform .15s;
  transform: rotate(270deg);
}

.promo__chev.is-open {
  transform: none;
}

.promo__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.apply {
  height: 34px;
  border-radius: var(--radius-sm);
  background: #0b0b0b;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.promo__ok {
  margin: 0;
  font-size: 11px;
  color: #1f9d55;
}
</style>
