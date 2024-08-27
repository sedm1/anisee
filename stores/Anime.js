export const useAnimeStore = defineStore('AnimeStore', {
    state: () => ({
        AllAnime: [],
        CurrentAnime: {},
        Pagination: {},
        IsLoading: false,
    }),
    actions:{
        async GET_ALL_ANIME_FROM_DB(page){
            this.IsLoading = true
            const config = useRuntimeConfig()
            try {
                const Anime = await $fetch(`${config.public.AnimeApi}/title/updates?items_per_page=15&filter=posters,code,names&page=${page}`,{
                    lazy: true,
                    server: false
                })
                
                this.AllAnime = Anime.list
                this.Pagination = Anime.pagination
                this.IsLoading = false
            }
            
            catch(err){
                console.log('Неудлось получить список аниме:' + err)
                return err
            }
        },
        async GET_ANIME_FROM_CODE(code){
            this.IsLoading = true
            const config = useRuntimeConfig()
            try {
                const AnimeInfo = await $fetch(`${config.public.AnimeApi}/title?code=${code}`, {
                    lazy: true
                })
                this.CurrentAnime = AnimeInfo
                this.IsLoading = false
                
            }
            catch(err){
                console.log('Неудлось получить аниме: ' + code)
                return err
            }
        }
    }
})
