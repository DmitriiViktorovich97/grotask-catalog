<script setup lang="ts">
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="custom-checkbox">
    <input v-model="model" type="checkbox">
    <span class="checkmark"></span>

    <span class="checkbox-text">
      <slot />
    </span>
  </label>
</template>

<style scoped>
/* Кастомный чекбокс */
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: #e31e24;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

/* Галочка внутри */
.checkmark::after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
  opacity: 1;
}

/* Если чекбокс НЕ выбран (инпут не имеет атрибута checked) */
.custom-checkbox input:not(:checked) ~ .checkmark {
  background-color: #f5f5f5;
  border: 1px solid #dcdcdc;
}

/* Прячем галочку, если не выбрано */
.custom-checkbox input:not(:checked) ~ .checkmark::after {
  opacity: 0;
}

.checkbox-text {
  font-size: 13px;
  color: #111;
  line-height: 1.4;
}
</style>