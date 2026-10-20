<script setup lang="ts">
const paymentMethod = defineModel<string>({ default: 'online' })
defineProps<{ disabled?: boolean }>()
const emit = defineEmits(['submit'])
</script>

<template>
  <div class="payment-card">
    <div class="payment-header">
      <h2 class="payment-title">Способ оплаты</h2>
      <p class="payment-subtitle">Выберите удобный способ оплаты заказа</p>
    </div>

    <div class="payment-options">

      <!-- Онлайн -->
      <label class="payment-option" :class="{ active: paymentMethod === 'online' }">
        <div class="option-content">
          <div class="option-header">
            <div class="option-title-wrap">
              <img src="/online_pay.svg" alt="Online Pay"/>
              <span class="option-title">Онлайн</span>
            </div>
            <input v-model="paymentMethod" type="radio" value="online" class="custom-radio">
          </div>
          <div class="option-desc">
            Visa, Mastercard, МИР, SberPay
          </div>
        </div>
      </label>

      <!-- При получении -->
      <label class="payment-option" :class="{ active: paymentMethod === 'offline' }">
        <div class="option-content">
          <div class="option-header">
            <div class="option-title-wrap">
              <img src="/offline_pay.svg" alt="Offline Pay"/>
              <span class="option-title">При получении</span>
            </div>
            <input v-model="paymentMethod" type="radio" value="offline" class="custom-radio">
          </div>
          <div class="option-desc">
            Наличными или картой при получении
          </div>
        </div>
      </label>

    </div>

    <!-- Инфо-блок -->
    <div class="payment-notice">
      <img src="/info.svg" alt="info"/>
      <span>При оформлении заказа вы будете перенаправлены на страницу платёжной системы</span>
    </div>
  </div>

  <!-- Блок с кнопкой -->
  <div class="checkout-action-bar">
    <button class="submit-btn" :disabled="disabled" @click="emit('submit')">
      Оформить заказ
    </button>
    <div class="action-hint">
      <img src="/info.svg" alt="info"/>
      <span v-if="disabled">Заполните обязательные поля (*), чтобы оформить заказ</span>
      <span v-else>Вы указали все необходимые данные, теперь можно оформить заказ</span>
    </div>
  </div>
</template>

<style scoped>
/* Контейнер карточки */
.payment-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: clamp(16px, 2vw, 24px);
  padding: clamp(20px, 3vw, 40px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  margin-top: 20px;
}

.payment-header {
  margin-bottom: 24px;
}

.payment-title {
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: 700;
  color: #111;
  margin: 0 0 8px 0;
}

.payment-subtitle {
  font-size: clamp(13px, 1vw, 15px);
  color: #555;
  margin: 0;
}

/* Сетка для карточек */
.payment-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

/* Карточка */
.payment-option {
  display: block;
  background-color: #f7f7f7;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-option.active {
  background-color: #f7f7f7;
  border-color: var(--c-red);
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.option-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-title {
  font-size: 14px;
  font-weight: 600;
  color: #111;
}

.option-desc {
  font-size: 12px;
  color: #888;
  padding-left: 28px;
}

.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  width: 23px;
  height: 23px;
  margin: 0;
  border: 2px solid #d1d1d1;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: border-color 0.2s ease;
}

.custom-radio::before {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--c-red);
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.custom-radio:checked {
  border-color: var(--c-red);
}

.custom-radio:checked::before {
  transform: scale(1);
}

.payment-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: black;
  line-height: 1.4;
}

.checkout-action-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: nowrap;
  padding-top: 24px;
  border-top: 2px solid var(--c-line);
}

.submit-btn {
  background-color: var(--c-red);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  white-space: nowrap;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--c-icon-price);
}

.action-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 13px;
  line-height: 1.3;
}

.action-hint img {
  filter: invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

@media (max-width: 768px) {
  .payment-options {
    grid-template-columns: 1fr;
  }

  .checkout-action-bar {
    display: none;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>