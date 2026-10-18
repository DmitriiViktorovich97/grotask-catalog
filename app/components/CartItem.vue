<script setup lang="ts">
import type {CartProduct} from '~/composables/useCart'

const props = defineProps<{ item: CartProduct }>()
const {remove, setQty} = useCart()
const onInput = (e: Event) => setQty(props.item.id, Number((e.target as HTMLInputElement).value) || 1)
</script>

<template>
  <li class="row">
    <div class="thumb">
      <label class="check">
        <input :disabled="item.stock == 0" v-model="item.selected" type="checkbox" :aria-label="`Выбрать ${item.name}`">
        <span/>
      </label>
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3"/>
          </svg>
        </button>
      </div>
      <span class="buy__pack">
        {{ item.stock ? `В наличии: ${item.stock} шт` : 'Нет в наличии' }}
      </span>
    </div>
  </li>
</template>

<style scoped>
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

.check {
  position: absolute;
  top: 6px;
  left: 6px;
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.check input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
}

.check span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #b9bfca;
  background: #fff;
}

.check input:checked + span {
  background: var(--c-text) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 6.2l2.2 2.2 4.8-4.8' fill='none' stroke='%23fff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/100% no-repeat;
  border-color: var(--c-text);
}

.check input:focus-visible + span {
  outline: 2px solid var(--c-red);
  outline-offset: 2px;
}

.thumb__img {
  width: 80%;
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
