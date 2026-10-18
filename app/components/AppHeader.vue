<script setup lang="ts">
const { selected, payTotal } = useCart()
</script>

<template>
  <header class="header">
    <div class="container header__in">
      <NuxtLink to="/" class="logo" aria-label="Гротеск">
        <span class="logo__flag" aria-hidden="true" />
        <span class="logo__text">
          <small>Интернет-магазин</small>
          <b>ГРОТЕСК</b>
        </span>
      </NuxtLink>

      <button class="cart-btn" aria-label="Корзина">
        <span class="cart-btn__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6"/></svg>
          <i class="cart-btn__badge">{{ selected.length }}</i>
        </span>
        <span class="cart-btn__sum">{{ formatRub(payTotal) }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header { height: var(--header-h); background: #fff; }
.header__in { height: 100%; display: flex; align-items: center; justify-content: space-between; }

.logo { display: flex; align-items: center; gap: 6px; text-decoration: none; color: var(--c-text); }
.logo__flag {
  width: 22px; height: 22px; border-radius: 50%;
  background: linear-gradient(#fff 0 33%, #1c4fd8 33% 66%, #e5223b 66%);
  box-shadow: 0 0 0 1px var(--c-line);
}
.logo__text { display: flex; flex-direction: column; line-height: 1; gap: 1px; }
.logo__text small { font-size: 7px; color: var(--c-muted); }
.logo__text b { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }

.cart-btn {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 6px 10px; border-radius: var(--radius-sm); background: var(--c-pill);
}
.cart-btn__icon { position: relative; color: var(--c-red); display: flex; }
.cart-btn__badge {
  position: absolute; top: -6px; right: -10px;
  min-width: 15px; height: 15px; padding: 0 4px; border-radius: 8px;
  background: var(--c-red); color: #fff; font: 600 10px/15px var(--font); font-style: normal; text-align: center;
}
.cart-btn__sum { font-size: 10px; color: var(--c-red); white-space: nowrap; }
</style>
