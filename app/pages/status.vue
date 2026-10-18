<script setup lang="ts">
import VxCrumbs from "../components/UI/VxCrumbs.vue";

const { goToCart } = useCustomRoute()
</script>

<template>
  <div class="container page">
    <VxCrumbs :items="[
      { title: 'Корзина', path: '/' },
      { title: 'Оформление заказа', path: '/checkout' },
      { title: 'Статус заказа' }
    ]" />

    <div class="status-wrapper">
      <div class="status-block">

        <div class="status-icon-wrap">
          <img src="/success.svg" alt="Success">
        </div>

        <h1 class="status-title">Заказ №001 успешно создан</h1>
        <p class="status-desc">Статус заказа вы можете отслеживать в личном кабинете</p>

        <button class="status-btn" @click="goToCart">
          В корзину
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.status-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh; /* Занимает половину экрана, чтобы блок был по центру */
  padding: clamp(40px, 8vw, 100px) 0;
}

.status-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
}

/* Квадрат с галочкой */
.status-icon-wrap {
  width: clamp(56px, 5vw, 72px);
  height: clamp(56px, 5vw, 72px);
  background-color: #e6f4ea;
  border-radius: clamp(12px, 1.5vw, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.status-icon-wrap svg {
  width: 50%;
  height: 50%;
}

.status-title {
  font-size: clamp(20px, 2vw, 32px);
  font-weight: 700;
  color: #111;
  margin: 0 0 clamp(8px, 1vw, 12px) 0;
  line-height: 1.3;
}

.status-desc {
  font-size: clamp(13px, 1.1vw, 16px);
  color: #666;
  margin: 0 0 clamp(24px, 3vw, 32px) 0;
  line-height: 1.5;
}

/* Кнопка */
.status-btn {
  background-color: var(--c-red, #e31e24);
  color: #fff;
  border: none;
  border-radius: clamp(6px, 0.8vw, 8px);
  padding: clamp(10px, 1vw, 14px) clamp(24px, 2vw, 32px);
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.status-btn:hover {
  background-color: #c9181e;
}

.status-btn:active {
  opacity: 0.8;
}
</style>