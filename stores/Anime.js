export const useAnimeStore = defineStore('AnimeStore', {
    state: () => ({
        AllAnime: [],
        CurrentAnime: {},
        CurrentAnimeFranchies: [],
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
        async GET_ANIME_FROM_SEARCH(query){
            this.IsLoading = true
            const config = useRuntimeConfig()
            try{
                const SearchAnimeResult = await $fetch(`${config.public.AnimeApi}/title/search?search=${query}&items_per_page=15&filter=posters,code,names&page=1`,{
                    lazy: true,
                    server: false
                })
                this.AllAnime = SearchAnimeResult.list
                this.Pagination = SearchAnimeResult.pagination
                this.IsLoading = false
            } catch(err){
                console.log('Ошибка поиска аниме в поиске')
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
        },
        async GET_ANIME_FRANSHIES(AnimeList){
            const config = useRuntimeConfig()
            try {
                for (let i = 0; i < AnimeList.length; i++){
                    const AnimeInfo = await $fetch(`${config.public.AnimeApi}/title?code=${AnimeList[i].code}&filter=posters,code,names`, {
                        lazy: true,
                        server: false
                    })
                    this.CurrentAnimeFranchies.push(AnimeInfo)
                }
            }
            catch(err){
                console.log('Неудлось получить франшизу аниме' + err)
                return err
            }
        }
    }
})
