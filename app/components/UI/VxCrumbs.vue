<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  path?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="crumbs" aria-label="Навигация">
    <NuxtLink to="/" class="crumbs__home show-on-mobile" aria-label="Главная">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 11l9-8 9 8M5 10v10h14V10"/>
      </svg>
    </NuxtLink>
    <span class="crumbs__sep show-on-mobile">/</span>

    <template v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.path" :to="item.path" class="crumbs__cur">
        {{ item.title }}
      </NuxtLink>

      <span v-else class="crumbs__cur" aria-current="page">
        {{ item.title }}
      </span>

      <span v-if="index < items.length - 1" class="crumbs__sep show-on-mobile">/</span>
    </template>
  </nav>
</template>

<style scoped>
.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  font-size: 11px;
  padding-top: 20px;
}

.crumbs a {
  text-decoration: none;
  color: inherit;
}

.crumbs__home {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--c-pill);
  color: #777;
  padding: 8px;
  gap: 4px;
}

.crumbs__sep {
  color: #b3b6bd;
}

.crumbs__cur {
  font-weight: 600;
  font-size: 14px;
}
</style>