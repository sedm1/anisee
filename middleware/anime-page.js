export default defineNuxtRouteMiddleware((to) => {
    const route = useRouter()
    if(!to.query.page || to.query.page <= 0) route.push({path: '/anime', query: {page: 1}})
})