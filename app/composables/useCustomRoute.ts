import { useRouter } from "vue-router";

const router = useRouter()

const goToCheckout = () => {
    if (selected.value.length > 0)
    {
        router.push('/checkout')
    }
}

const goToStatus = () => {
    router.push('/status')
}