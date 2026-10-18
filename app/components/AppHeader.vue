<script setup lang="ts">
const {selected, payTotal} = useCart()
</script>

<template>
  <header class="header show-on-mobile">
    <div class="container header__in">
      <AppLogo></AppLogo>

      <button class="cart-btn" aria-label="Корзина">
        <span class="cart-btn__icon">
          <img src="/cart.svg">
          <i class="cart-btn__badge">{{ selected.length }}</i>
        </span>
        <span class="cart-btn__sum">{{ formatRub(payTotal) }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 12px 0;
  background: #fff;
}

.header__in {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cart-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  background: var(--c-pill);
}

.cart-btn__icon {
  position: relative;
  display: flex;
}

.cart-btn__badge {
  position: absolute;
  top: -6px;
  left: 25px;
  min-width: 15px;
  height: 15px;
  padding: 0 4px;
  border-radius: 8px;
  background: var(--c-icon-price);
  color: #fff;
  font: 600 10px/15px var(--font);
  font-style: normal;
  text-align: center;
}

.cart-btn__sum {
  font-size: 10px;
  font-weight: 600;
  color: var(--c-icon);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .show-on-mobile {
    display: none !important;
  }
}
</style>
