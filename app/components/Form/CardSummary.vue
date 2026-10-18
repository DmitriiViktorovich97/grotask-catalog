<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import VxInput from "./UI/VxInput.vue";

const {goodsTotal, discount, payTotal, selected, promo, promoApplied} = useCart()
const promoOpen = ref(true)

const apply = () => {
  promoApplied.value = promo.value.trim().length > 0
}

const route = useRoute()
const router = useRouter()
const goToCheckout = () => {
  if (selected.value.length > 0)
  {
    router.push('/checkout')
  }
}
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
        <div class="line">
          <dt>Скидка</dt>
          <dd class="red">−{{ formatRub(discount) }}</dd>
        </div>
        <div class="line line--total">
          <dt>Итого:</dt>
          <dd>{{ formatRub(payTotal) }}</dd>
        </div>
      </dl>
      <button class="checkout" :disabled="!selected.length" @click="goToCheckout" v-if="route.path !== '/checkout'" >
        К оформлению
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </button>

      <button class="checkout" :disabled="!selected.length" @click="goToCheckout" v-if="route.path !== '/'" >
        Оформить заказ
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
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

      <div v-show="promoOpen" class="promo__body">
        <VxInput v-model="promo" label="Промокод" placeholder="Введите промокод"/>
        <button class="apply" @click="apply">Применить</button>
        <p v-if="promoApplied" class="promo__ok">Промокод принят</p>
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

.field {
  position: relative;
  display: block;
}

.field__cap {
  display: block;
  font-size: 9px;
  color: var(--c-muted);
  margin-bottom: 3px;
}

.field__in {
  width: 100%;
  height: 36px;
  padding: 0 32px 0 12px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--c-pill);
  font-size: 12px;
}

.field__in::placeholder {
  color: #b3b6bd;
}

.field__x {
  position: absolute;
  right: 12px;
  bottom: 11px;
  font-size: 11px;
  color: #b3b6bd;
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
