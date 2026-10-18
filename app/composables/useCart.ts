interface ApiProduct {
    id: number
    name: string
    price: number
    old_price: number | null
    image: string
    sku: string
    quantity: number
}

export const useCart = () => {
    // Глобальное состояние корзины. Используем useState, чтобы данные сохранялись при переходе между страницами
    const items = useState<CartProduct[]>('cart-items', () => [])

    // Загрузка данных с сервера
    const load = async () => {
        if (items.value.length > 0) return
        let res: { data: ApiProduct[] } | null = null
        const API_URL = "https://growtask.ru/test-front/api/products"

        try {
            res = await $fetch<{ data: ApiProduct[] }>(API_URL)
        } catch (e) {
            res = await $fetch<{ data: ApiProduct[] }>('/goods.json')
        }

        // Маппинг данных из API в формат нашего фронтенда.
        items.value = res.data.map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            image: p.image.replace(/^http:/, 'https:'),
            unitPrice: p.price,
            oldUnitPrice: p.old_price ?? p.price,
            qty: p.quantity > 0 ? 1 : 0,
            stock: p.quantity,
            selected: p.quantity > 0
        }))

        return null
    }

    // ЛОГИКА ПРОМОКОДА
    const promo = useState<string>('cart-promo', () => '')
    const promoApplied = useState<boolean>('cart-promo-applied', () => false)
    const promoError = useState<string>('cart-promo-error', () => '')

    // Список товаров, доступных для покупки (отсекаем то, чего нет на складе)
    const availableItems = computed(() => items.value.filter(i => i.stock > 0))
    // Только те товары, которые пользователь отметил галочкой (и они в наличии)
    const selected = computed(() => items.value.filter(i => i.selected && i.stock > 0))
    // Проверка для чекбокса "Выбрать все": выбрано ли абсолютно всё, что можно купить
    const allSelected = computed(() => {
        if (availableItems.value.length === 0) return false
        return availableItems.value.every(i => i.selected)
    })

    // Сумма по старым ценам (для отображения зачеркнутой цены и общей выгоды)
    const goodsTotal = computed(() => selected.value.reduce((s, i) => s + i.oldUnitPrice * i.qty, 0))
    // Сумма по актуальным ценам (без учета промокода)
    const basePayTotal = computed(() => selected.value.reduce((s, i) => s + i.unitPrice * i.qty, 0))
    // Разница между старой и новой ценой (скидка магазина)
    const discount = computed(() => goodsTotal.value - payTotal.value)
    // Скидка по промокоду (10% от суммы актуальных цен)
    const promoDiscount = computed(() => {
        if (!promoApplied.value) return 0
        return Math.round(basePayTotal.value * 0.1) // 10% скидка
    })
    const payTotal = computed(() => basePayTotal.value - promoDiscount.value)

    // Валидация промокода
    const applyPromo = () => {
        const code = promo.value.trim().toUpperCase()

        if (code === 'GROWTASK2026') {
            promoApplied.value = true
            promoError.value = ''
        } else if (code === '') {
            promoApplied.value = false
            promoError.value = ''
        } else {
            promoApplied.value = false
            promoError.value = 'Неверный промокод'
        }
    }

    // Массовое выделение/снятие галочек
    const toggleAll = () => {
        const next = !allSelected.value

        items.value.forEach(i => {
            if (i.stock > 0) {
                i.selected = next
            } else {
                i.selected = false
            }
        })
    }

    const remove = (id: number) => {
        items.value = items.value.filter(i => i.id !== id)
    }

    const clear = () => {
        items.value = []
    }

    // Ограничиваем количество: не меньше 1 и не больше, чем есть на складе
    const setQty = (id: number, qty: number) => {
        const it = items.value.find(i => i.id === id)
        if (it) it.qty = Math.min(it.stock, Math.max(1, qty))
    }

    return {
        load,
        items,
        promo,
        promoApplied,
        promoError,
        applyPromo,
        selected,
        allSelected,
        goodsTotal,
        promoDiscount,
        payTotal,
        discount,
        toggleAll,
        remove,
        clear,
        setQty
    }
}

export const formatRub = (n: number) =>
    new Intl.NumberFormat('ru-RU').format(Math.round(n)) + '\u00A0₽'
