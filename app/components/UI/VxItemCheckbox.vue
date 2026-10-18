<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

defineProps<{
  disabled?: boolean
  ariaLabel?: string
}>()
</script>

<template>
  <label class="vx-checkbox" :class="{ 'is-disabled': disabled }">
    <input
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :aria-label="ariaLabel"
    >

    <span class="vx-box">
      <img class="check__icon" src="/check.svg" alt="check">
    </span>

    <span v-if="$slots.default" class="vx-label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.vx-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  user-select: none;
}

.vx-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Скрываем нативный инпут */
.vx-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  cursor: pointer;
}

/* Квадратик */
.vx-box {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size, 20px);
  height: var(--checkbox-size, 20px);
  border-radius: 4px;
  border: 1px solid #b9bfca;
  background: #fff;
  transition: background-color 0.2s, border-color 0.2s;
  pointer-events: none;
}

/* Галочка */
.vx-icon {
  width: 70%;
  height: 70%;
  opacity: 0;
  color: #fff;
  transition: opacity 0.2s;
}

/* Состояние checked */
.vx-checkbox input:checked + .vx-box {
  background: var(--c-text, #000);
  border-color: var(--c-text, #000);
}

.vx-checkbox input:checked + .vx-box .vx-icon {
  opacity: 1;
}

/* Фокус */
.vx-checkbox input:focus-visible + .vx-box {
  outline: 2px solid var(--c-red, #e31e24);
  outline-offset: 2px;
}
</style>