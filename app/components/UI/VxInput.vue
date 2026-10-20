<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{ (e: 'blur'): void }>()

const clear = () => {
  model.value = ''
  emit('blur')
}
</script>

<template>
  <div class="form-group">
    <label class="form-label">
      {{ label }}<span v-if="required" class="req">*</span>
    </label>

    <div class="input-wrapper">
      <span v-if="$slots.icon" class="input-icon">
        <slot name="icon" />
      </span>

      <input
          v-model="model"
          :type="type || 'text'"
          :placeholder="placeholder"
          class="form-input"
          :class="{ 'has-icon': $slots.icon, 'has-error': !!error }"
          :aria-invalid="!!error"
          @blur="emit('blur')"
      >

      <button
          v-if="model"
          type="button"
          class="clear-btn"
          @click="clear"
          aria-label="Очистить"
      >
        ✕
      </button>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>
  </div>
</template>

<style scoped>
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
  color: #e31e24;
}

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

.form-input.has-error {
  border-color: #e31e24;
  background-color: #fff;
}

.form-error {
  margin: 0;
  font-size: 12px;
  color: #e31e24;
}

.form-input.has-icon {
  padding-left: 44px;
}

.form-input::placeholder {
  color: #a0a0a0;
}

.form-input:focus {
  outline: none;
  border-color: #ccc;
  background-color: #fff;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 15px;
  color: #999;
  display: flex;
  pointer-events: none;
}

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
  font-size: 14px;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #333;
}
</style>