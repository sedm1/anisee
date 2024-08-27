export const useAnimeStore = defineStore('AnimeStore', {
    state: () => ({
        AllAnime: [],
        Pagination: {},
        IsLoading: true
    }),
    actions:{
        async GET_ALL_ANIME_FROM_DB(page){
            this.IsLoading = true
            const config = useRuntimeConfig()
            try {
                const anime = await $fetch(`${config.public.AnimeApi}/v3/title/updates?items_per_page=15&filter=posters,code,names&page=${page}`)
                
                this.AllAnime = anime.list
                this.Pagination = anime.pagination
                this.IsLoading = false
            }
            
            catch(err){
                console.log('Неудлось получить список аниме:' + err)
                return err
            }
        }
    }
})
