<script setup lang="ts">
import OrderCard from "../components/Form/OrderCard.vue";
import CheckoutBuyer from "../components/Form/CheckoutBuyer.vue";
import VxCrumbs from "../components/UI/VxCrumbs.vue";
import CheckoutPayment from "../components/Form/CheckoutPayment.vue";
import CardSummary from "../components/Form/CardSummary.vue";

const { buyerForm, paymentMethod, submitOrder, error } = useCheckout()
</script>

<template>
  <div class="container page">
    <VxCrumbs :items="[
      { title: 'Корзина', path: '/' },
      { title: 'Оформление заказа' }
    ]" />

    <div class="checkout-header">
      <NuxtLink to="/" class="back-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>В корзину</span>
      </NuxtLink>
      <div class="divider"></div>
      <h1 class="page-title">Оформление заказа</h1>
    </div>

    <div class="grid">
      <section class="list">

        <OrderCard/>
        <CheckoutBuyer v-model="buyerForm"/>
        <CheckoutPayment v-model="paymentMethod" @submit="submitOrder"/>
      </section>

      <CardSummary @submit="submitOrder"/>
    </div>

  </div>
</template>

<style scoped>
.list {
  flex: 1;
  min-width: 0;
}

.grid {
  display: flex;
  gap: var(--col-gap);
  align-items: flex-start;
  margin-top: clamp(20px, 2vw, 40px);
}

.checkout-header {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.5vw, 32px);
  padding-top: clamp(20px, 2vw, 40px);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-text, #000);
  text-decoration: none;
  font-size: clamp(14px, 1.1vw, 18px);
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.back-link svg {
  width: clamp(20px, 1.5vw, 28px);
  height: clamp(20px, 1.5vw, 28px);
}

.divider {
  width: 1px;
  height: clamp(24px, 2vw, 36px);
  background-color: #e5e5e5;
}

.page-title {
  font-size: clamp(24px, 2.5vw, 40px);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .grid {
    flex-direction: column;
    align-items: stretch;
  }

  .grid > :deep(.side) {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .checkout-header {
    gap: 12px;
  }
}
</style>