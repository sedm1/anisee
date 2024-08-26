interface Pagination{
    current_page?: number,
    items_per_page?: number,
    pages?: number
}

interface State {
    AllAnime: Object[],
    Pagination: Pagination,
    IsLoading: Boolean
}
interface AllAnime{
    list: Object[],
    pagination: any
}
export const useAnimeStore = defineStore('AnimeStore', {
    state: (): State => ({
        AllAnime: [],
        Pagination: {},
        IsLoading: true
    }),
    actions:{
         GET_ALL_ANIME_FROM_DB(page: number){
            (async () => {
                this.IsLoading = true
                const config = useRuntimeConfig()
                const anime:AllAnime = await $fetch(`${config.public.AnimeApi}/v3/title/updates?items_per_page=15&filter=posters,code,names&page=${page}`)
                return anime
            })()
            .then((res) => {
                this.AllAnime = res.list
                this.Pagination = res.pagination
                this.IsLoading = false
            })
            .catch((err:string) => {
                console.log('Неудлось получить список аниме:' + err)
                return err
            })
        }
    }
})
