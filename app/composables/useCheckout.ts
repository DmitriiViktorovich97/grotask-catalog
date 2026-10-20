import { reactive, ref, computed } from 'vue'

type Field = 'firstName' | 'lastName' | 'phone' | 'email'
const FIELDS: Field[] = ['firstName', 'lastName', 'phone', 'email']

const validators: Record<Field, (v: string) => string> = {
    firstName: v => v.trim() ? '' : 'Укажите имя',
    lastName: v => v.trim() ? '' : 'Укажите фамилию',
    phone: v => {
        const v0 = v.trim()
        if (!v0) return 'Укажите телефон'
        // допускаем только цифры, пробелы, скобки, дефисы и ведущий +
        if (!/^\+?[\d\s()-]+$/.test(v0)) return 'Телефон может содержать только цифры'
        const digits = v0.replace(/\D/g, '')
        const ok = (digits.length === 11 && /^[78]/.test(digits)) || digits.length === 10
        return ok ? '' : 'Введите номер полностью, например 8 800 555 35 35'
    },
    email: v => {
        const v0 = v.trim()
        if (!v0) return 'Укажите почту'
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v0) ? '' : 'Введите почту в формате mail@example.com'
    }
}

export const useCheckout = () => {
    const { selected, payTotal, promoApplied, promoDiscount, promo } = useCart()
    const { goToStatus } = useCustomRoute()

    const buyerForm = reactive({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        comment: '',
        subscribe: false
    })

    const paymentMethod = ref('online')

    const error = ref<string | null>(null)

    // Какие поля пользователь уже трогал, чтобы не ругаться на пустую форму сразу
    const touched = reactive<Record<Field, boolean>>({
        firstName: false, lastName: false, phone: false, email: false
    })
    const touch = (field: Field) => { touched[field] = true }

    // Ошибки по всем полям (пустая строка = поле корректно)
    const errors = computed(() => {
        const res = {} as Record<Field, string>
        FIELDS.forEach(f => { res[f] = validators[f](buyerForm[f]) })
        return res
    })

    // Ошибки, которые показываем пользователю (только для тронутых полей)
    const visibleErrors = computed(() => {
        const res = {} as Record<Field, string>
        FIELDS.forEach(f => { res[f] = touched[f] ? errors.value[f] : '' })
        return res
    })

    const isValid = computed(() => FIELDS.every(f => !errors.value[f]))

    const submitOrder = () => {
        error.value = null

        // Не даём оформить заказ с некорректной формой и подсвечиваем все ошибки
        if (!isValid.value) {
            FIELDS.forEach(touch)
            return
        }

        const orderData = {
            customer: {
                firstName: buyerForm.firstName.trim(),
                lastName: buyerForm.lastName.trim(),
                phone: buyerForm.phone.trim(),
                email: buyerForm.email.trim(),
                comment: buyerForm.comment,
                subscribe: buyerForm.subscribe,
            },
            paymentMethod: paymentMethod.value,
            promoCode: promoApplied.value ? promo.value.trim().toUpperCase() : null,
            promoDiscount: promoDiscount.value,
            total: payTotal.value,
            items: selected.value.map(item => ({
                id: item.id,
                name: item.name,
                sku: item.sku,
                price: item.unitPrice,
                qty: item.qty
            }))
        }

        try {
            console.log(orderData)
            goToStatus()
        } catch (e: any) {
            error.value = 'Не удалось оформить заказ. Попробуйте еще раз.'
            console.error(e)
        }
    }

    return {
        buyerForm,
        paymentMethod,
        submitOrder,
        error,
        isValid,
        visibleErrors,
        touch
    }
}