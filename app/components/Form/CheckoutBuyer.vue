<script setup lang="ts">
import VxInput from "../UI/VxInput.vue";
import VxCheckbox from "../UI/VxCheckbox.vue";

const form = defineModel<any>({ required: true })

defineProps<{
  errors: Record<string, string>
}>()

const emit = defineEmits<{ (e: 'touch', field: 'firstName' | 'lastName' | 'phone' | 'email'): void }>()
</script>

<template>
  <div class="buyer-card">
    <div class="buyer-header">
      <h2 class="buyer-title">Покупатель</h2>
      <p class="buyer-subtitle">Укажите свои данные для покупки наших товаров</p>
    </div>

    <form class="buyer-form" @submit.prevent>
      <!-- Сетка для полей (2 колонки на десктопе) -->
      <div class="form-grid">

        <!-- Имя -->
        <VxInput v-model="form.firstName" label="Имя" placeholder="Иван" required
                 :error="errors.firstName" @blur="emit('touch', 'firstName')"/>

        <!-- Фамилия -->
        <VxInput v-model="form.lastName" label="Фамилия" placeholder="Иванов" required
                 :error="errors.lastName" @blur="emit('touch', 'lastName')"/>

        <!-- Телефон -->
        <VxInput v-model="form.phone" label="Телефон" placeholder="8 800 555 35 35" type="tel" required
                 :error="errors.phone" @blur="emit('touch', 'phone')">
          <template #icon>
            <img src="/phone.svg" alt="phone">
          </template>
        </VxInput>

        <!-- Почта -->
        <VxInput v-model="form.email" label="Почта" placeholder="mail@example.com" type="email" required
                 :error="errors.email" @blur="emit('touch', 'email')">
          <template #icon>
            <img src="/mail.svg" alt="phone">
          </template>
        </VxInput>
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
      <VxCheckbox v-model="form.subscribe">
        Хочу получать уведомления о скидках и специальных предложениях
      </VxCheckbox>

    </form>
  </div>
</template>

<style scoped>
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
  resize: vertical;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>