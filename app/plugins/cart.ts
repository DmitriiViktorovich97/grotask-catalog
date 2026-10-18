export default defineNuxtPlugin(async (nuxtApp) => {
    const { load } = useCart()
    await load()
})