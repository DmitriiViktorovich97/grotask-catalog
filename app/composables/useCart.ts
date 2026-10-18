export interface CartProduct {
  id: number
  brand: string
  name: string
  unitPrice: number
  oldUnitPrice: number
  qty: number
  pack: string
  selected: boolean
}

const QTYS = [220, 360, 360, 560, 180, 200, 280, 180, 120, 260, 220, 260, 140, 340, 280, 360]

export const useCart = () => {
  const items = useState<CartProduct[]>('cart-items', () =>
    QTYS.map((qty, i) => ({
      id: i + 1,
      brand: 'Brand',
      name: 'Product Name',
      unitPrice: 900 + (i % 5) * 70,
      oldUnitPrice: 1000 + (i % 5) * 70,
      qty,
      pack: '0.5 кг / уп.',
      selected: true
    }))
  )
  const promo = useState<string>('cart-promo', () => '')
  const promoApplied = useState<boolean>('cart-promo-applied', () => false)

  const selected = computed(() => items.value.filter(i => i.selected))
  const allSelected = computed(() => items.value.length > 0 && selected.value.length === items.value.length)

  const goodsTotal = computed(() => selected.value.reduce((s, i) => s + i.oldUnitPrice * i.qty, 0))
  const payTotal = computed(() => selected.value.reduce((s, i) => s + i.unitPrice * i.qty, 0))
  const discount = computed(() => goodsTotal.value - payTotal.value)

  const toggleAll = () => {
    const next = !allSelected.value
    items.value.forEach(i => (i.selected = next))
  }
  const remove = (id: number) => { items.value = items.value.filter(i => i.id !== id) }
  const clear = () => { items.value = [] }
  const setQty = (id: number, qty: number) => {
    const it = items.value.find(i => i.id === id)
    if (it) it.qty = Math.max(1, qty)
  }

  return { items, promo, promoApplied, selected, allSelected, goodsTotal, payTotal, discount, toggleAll, remove, clear, setQty }
}

export const formatRub = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(Math.round(n)) + '\u00A0₽'
