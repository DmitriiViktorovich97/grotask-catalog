<script setup lang="ts">

</script>

<template>
  <NuxtLink to="/" class="logo">
    <img class="logo__flag" src="/logo.svg" alt="">
    <span class="logo__text">
      <small>Сайт сделан в студии</small>
      <svg
          width="160"
          height="24"
          viewBox="0 0 160 24"
          xmlns="http://www.w3.org/2000/svg"
          class="logo-svg"
      >
      <text
          x="0"
          y="20"
          font-family="Arial Black, Impact, sans-serif"
          font-weight="900"
          font-size="20"
          fill="#0D0D0D"
          textLength="160"
          lengthAdjust="spacingAndGlyphs"
      >
        ГРОТЕСК
      </text>
    </svg>
  </span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--c-text);
}

.logo-svg {
  width: clamp(120px, 8.33vw, 160px);
  height: auto;
  display: block;
}

.logo__flag {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex: none;
  object-fit: cover;
}

.logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 2px;
}

.logo__text small {
  font-size: 11px;
  color: #000000;
  text-decoration: none;
  font-weight: 400;
}

.logo__text b {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
</style>