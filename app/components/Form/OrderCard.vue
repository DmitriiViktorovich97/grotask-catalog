<script setup lang="ts">
const { selected } = useCart()

// --- Логика перемотки ---
const sliderRef = ref<HTMLElement | null>(null)
const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const onMouseDown = (e: MouseEvent) => {
  if (!sliderRef.value) return
  isDown.value = true
  // Запоминаем начальную позицию курсора и текущий скролл
  startX.value = e.pageX - sliderRef.value.offsetLeft
  scrollLeft.value = sliderRef.value.scrollLeft
}

const onMouseLeave = () => {
  isDown.value = false
}

const onMouseUp = () => {
  isDown.value = false
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDown.value || !sliderRef.value) return
  e.preventDefault()
  const x = e.pageX - sliderRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  sliderRef.value.scrollLeft = scrollLeft.value - walk
}
</script>

<template>
  <div class="order-summary-card">
    <h2 class="summary-title">{{ selected.length }} товаров</h2>

    <div class="summary-slider" ref="sliderRef" :class="{ 'is-dragging': isDown }"
         @mousedown="onMouseDown" @mouseleave="onMouseLeave" @mouseup="onMouseUp" @mousemove="onMouseMove">
      <div v-for="item in selected" :key="item.id" class="summary-thumb">
        <img :src="item.image" :alt="item.name" draggable="false"
             @dragstart.prevent class="summary-img">
        <span class="summary-badge">{{ item.qty }}</span>
      </div>
    </div>

    <NuxtLink to="/" class="return-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Вернуться в корзину</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.order-summary-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: clamp(16px, 2vw, 24px);
  padding: clamp(20px, 3vw, 40px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  overflow: hidden;
}

.summary-title {
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 700;
  margin-top: 0;
  margin-bottom: clamp(16px, 2vw, 24px);
  color: #111;
}

.summary-slider {
  display: flex;
  gap: clamp(10px, 1.5vw, 16px);
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 8px 4px;
  cursor: grab;
  user-select: none;
}

.summary-slider.is-dragging {
  cursor: grabbing;
  scroll-behavior: auto;
  scroll-snap-type: none;
}

.summary-slider::-webkit-scrollbar {
  display: none;
}

.summary-thumb {
  position: relative;
  flex: 0 0 auto;
  width: clamp(70px, 6vw, 90px);
  aspect-ratio: 1 / 1;
  background-color: #f5f7fa;
  border-radius: clamp(8px, 1vw, 12px);
  display: grid;
  place-items: center;
  scroll-snap-align: start;
}

.summary-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  display: block;
}

.summary-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: clamp(9px, 0.7vw, 12px);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  border: 2px solid #fff;
  z-index: 2;
}

/* --- Кнопка возврата --- */
.return-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #f5f5f5;
  color: #111;
  text-decoration: none;
  padding: clamp(10px, 1vw, 14px) clamp(16px, 1.5vw, 24px);
  border-radius: clamp(8px, 1vw, 12px);
  font-size: clamp(14px, 1vw, 16px);
  font-weight: 500;
  transition: background-color 0.2s ease;
  margin-top: clamp(24px, 3vw, 40px);
}

.return-btn:hover {
  background-color: #e8e8e8;
}

.return-btn svg {
  width: clamp(16px, 1.2vw, 20px);
  height: clamp(16px, 1.2vw, 20px);
}

@media (max-width: 768px) {
  .return-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .back-link span {
    display: none;
  }
}
</style>