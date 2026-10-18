export default function useCustomRoute() {
    const router = useRouter()

    const goToCart= () => {
        router.push('/')
    }

    const goToCheckout = () => {
        router.push('/checkout')
    }

    const goToStatus = () => {
        router.push('/status')
    }

    return {
        goToCart,
        goToCheckout,
        goToStatus
    }
}