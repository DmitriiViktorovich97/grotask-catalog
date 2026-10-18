<script setup lang="ts">
import {reactive} from 'vue'
import VxInput from "./UI/VxInput.vue";

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  comment: '',
  subscribe: false
})

const clearField = (field: keyof typeof form) => {
  form[field] = ''
}
</script>

<template>
  <div class="buyer-card">
    <!-- Шапка блока -->
    <div class="buyer-header">
      <h2 class="buyer-title">Покупатель</h2>
      <p class="buyer-subtitle">Укажите свои данные для покупки наших товаров</p>
    </div>

    <form class="buyer-form" @submit.prevent>
      <!-- Сетка для полей (2 колонки на десктопе) -->
      <div class="form-grid">

        <!-- Имя -->
        <VxInput v-model="form.firstName" label="Имя" placeholder="Иван" required/>

        <!-- Фамилия -->
        <div class="form-group">
          <label class="form-label">Фамилия<span class="req">*</span></label>
          <div class="input-wrapper">
            <input
                v-model="form.lastName"
                type="text"
                placeholder="Иванов"
                class="form-input"
            >
            <button
                v-if="form.lastName"
                type="button"
                class="clear-btn"
                @click="clearField('lastName')"
                aria-label="Очистить"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Телефон -->
        <div class="form-group">
          <label class="form-label">Телефон</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round"><path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <input
                v-model="form.phone"
                type="tel"
                placeholder="+7 800 555 35 35"
                class="form-input has-icon"
            >
            <button
                v-if="form.phone"
                type="button"
                class="clear-btn"
                @click="clearField('phone')"
                aria-label="Очистить"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Почта -->
        <div class="form-group">
          <label class="form-label">Почта</label>
          <div class="input-wrapper">
            <span class="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path
                  d="M22 7l-10 7L2 7"/></svg>
            </span>
            <input
                v-model="form.email"
                type="email"
                placeholder="mail@example.com"
                class="form-input has-icon"
            >
            <button
                v-if="form.email"
                type="button"
                class="clear-btn"
                @click="clearField('email')"
                aria-label="Очистить"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="form-alert">
        <svg class="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span>Внимательно проверьте контактные данные, они нужны для получения заказа</span>
      </div>

      <!-- Комментарий -->
      <div class="form-group comment-group">
        <label class="form-label">Комментарий к заказу</label>
        <textarea
            v-model="form.comment"
            placeholder="Напишите свои пожелания..."
            class="form-textarea"
        ></textarea>
      </div>

      <!-- Чекбокс подписки -->
      <label class="custom-checkbox">
        <input v-model="form.subscribe" type="checkbox">
        <span class="checkmark"></span>
        <span class="checkbox-text">Хочу получать уведомления о скидках и специальных предложениях</span>
      </label>

    </form>
  </div>
</template>

<style scoped>
@import '../assets/css/checkbox.css';

.buyer-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: clamp(16px, 2vw, 24px);
  padding: clamp(20px, 3vw, 40px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  margin-top: 20px;
}

.buyer-header {
  margin-bottom: clamp(20px, 3vw, 32px);
}

.buyer-title {
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 700;
  color: #111;
  margin: 0 0 8px 0;
}

.buyer-subtitle {
  font-size: clamp(14px, 1.1vw, 16px);
  color: #555;
  margin: 0;
}

/* Сетка формы */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(16px, 2vw, 24px);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  color: #777;
}

.req {
  color: #e31e24; /* Красная звездочка */
}

/* Обертка для инпута (чтобы позиционировать иконки и крестики) */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  height: clamp(44px, 3.5vw, 52px);
  background-color: #f5f5f5;
  border: 1px solid transparent;
  border-radius: clamp(8px, 1vw, 12px);
  padding: 0 16px;
  font-size: 14px;
  color: #111;
  transition: border-color 0.2s, background-color 0.2s;
}

.form-input.has-icon {
  padding-left: 44px; /* Оставляем место для иконки */
}

.form-input::placeholder {
  color: #a0a0a0;
}

.form-input:focus {
  outline: none;
  border-color: #ccc;
  background-color: #fff;
}

/* Иконки внутри инпутов */
.input-icon {
  position: absolute;
  left: 16px;
  color: #999;
  display: flex;
  pointer-events: none;
}

/* Кнопка очистки (крестик) */
.clear-btn {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #333;
}

/* Блок предупреждения */
.form-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  margin: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  color: #555;
  line-height: 1.4;
}

.alert-icon {
  flex-shrink: 0;
  color: #111;
  margin-top: 2px;
}

/* Текстовое поле */
.comment-group {
  margin-bottom: 24px;
}

.form-textarea {
  width: 100%;
  min-height: clamp(80px, 8vw, 120px);
  background-color: #f5f5f5;
  border: 1px solid transparent;
  border-radius: clamp(8px, 1vw, 12px);
  padding: 16px;
  font-size: 14px;
  color: #111;
  resize: vertical; /* Позволяем менять высоту */
  font-family: inherit;
  transition: border-color 0.2s, background-color 0.2s;
}

.form-textarea::placeholder {
  color: #a0a0a0;
}

.form-textarea:focus {
  outline: none;
  border-color: #ccc;
  background-color: #fff;
}

/* Адаптив для мобилок */
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr; /* В одну колонку */
  }
}
</style>