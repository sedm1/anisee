export default defineNuxtRouteMiddleware((to) => {
    const route = useRouter()
    if(!to.query.page) route.push({path: '/anime', query: {page: 1}})
    
})