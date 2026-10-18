import { reactive, ref } from 'vue'

export const useCheckout = () => {
    const { selected, payTotal } = useCart()
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

    const submitOrder = () => {
        error.value = null

        const orderData = {
            customer: {
                firstName: buyerForm.firstName,
                lastName: buyerForm.lastName,
                phone: buyerForm.phone,
                email: buyerForm.email,
                comment: buyerForm.comment,
                subscribe: buyerForm.subscribe,
            },
            paymentMethod: paymentMethod.value,
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
        error
    }
}