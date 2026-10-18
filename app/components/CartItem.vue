<script setup lang="ts">
import type {CartProduct} from '~/composables/useCart'
import VxItemCheckbox from "./UI/VxItemCheckbox.vue";

const props = defineProps<{ item: CartProduct }>()
const {remove, setQty} = useCart()
const onInput = (e: Event) => setQty(props.item.id, Number((e.target as HTMLInputElement).value) || 1)
</script>

<template>
  <li class="row">
    <div class="thumb">
      <VxItemCheckbox
          v-model="item.selected"
          :disabled="item.stock === 0"
          :aria-label="`Выбрать ${item.name}`"
          class="item-checkbox"
      />
      <img class="thumb__img" :src="item.image" :alt="item.name">
      <div class="show-on-mobile">
        <span class="buy__price">{{ formatRub(item.unitPrice * item.qty) }}</span>
        <span class="buy__old">{{ formatRub(item.oldUnitPrice * item.qty) }}</span>
      </div>

    </div>

    <div class="info">
      <span class="info__brand">{{ item.sku }}</span>
      <span class="info__name">{{ item.name }}</span>
    </div>
    <div class="buy">
      <span class="buy__price hide-to-mobile">{{ formatRub(item.unitPrice * item.qty) }}</span>
      <span class="buy__old hide-to-mobile">{{ formatRub(item.oldUnitPrice * item.qty) }}</span>

      <div class="buy__ctrl">
        <div class="stepper">
          <button aria-label="Меньше" @click="setQty(item.id, item.qty - 1)">−</button>
          <input :value="item.qty" inputmode="numeric" aria-label="Количество" @change="onInput">
          <button aria-label="Больше" @click="setQty(item.id, item.qty + 1)">+</button>
        </div>
        <button class="trash" aria-label="Удалить" @click="remove(item.id)">
          <img src="/trash.svg" alt="trash">
        </button>
      </div>
      <span class="buy__pack">
        {{ item.stock ? `В наличии: ${item.stock} шт` : 'Нет в наличии' }}
      </span>
    </div>
  </li>
</template>

<style scoped>
.item-checkbox {
  position: absolute;
  top: 6px;
  left: 6px;
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  z-index: 2;
  --checkbox-size: 16px;
}

.row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: var(--row-pt) 0 var(--row-pb);
  border-bottom: 2px solid var(--c-line);
}

.row:last-child {
  border-bottom: 0;
}

.thumb {
  position: relative;
  flex: none;
  width: var(--thumb);
  height: var(--thumb);
  border-radius: var(--radius-sm);
  background: var(--c-thumb);
  display: grid;
  place-items: center;
}

.thumb__img {
  width: 100%;
  object-fit: contain;
}

.row:has(input:disabled) {
  opacity: .5;
}

.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info__brand {
  font-size: 10px;
  color: var(--c-muted);
}

.info__name {
  font-size: 14px;
  font-weight: 600;
}

.buy {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.buy__price {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  color: #262626;
}

.buy__old {
  font-size: 10px;
  color: #b3b6bd;
  margin-top: 2px;
}

.buy__ctrl {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.buy__pack {
  font-size: 9px;
  color: #b3b6bd;
  margin-top: 4px;
  align-self: flex-start;
}

.stepper {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 6px;
  background: var(--c-pill);
  border-radius: var(--radius-sm);
}

.stepper button {
  width: 18px;
  height: 24px;
  font-size: 14px;
  line-height: 1;
  color: #555;
}

.stepper input {
  width: 34px;
  border: 0;
  background: none;
  text-align: center;
  font-size: 12px;
  padding: 0;
  outline-offset: 2px;
}

.trash {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: var(--c-pill);
  border-radius: var(--radius-sm);
}

.trash:hover {
  color: var(--c-red);
}

.show-on-mobile {
  display: none;
}

@media (max-width: 414px) {
  .show-on-mobile {
    display: grid;
    grid-auto-flow: row;
    justify-items: start;
    padding-top: 15px;
  }

  .buy__price.hide-to-mobile, .buy__old.hide-to-mobile {
    display: none;
  }

  .buy {
    padding-top: 55px;
  }

}
</style>