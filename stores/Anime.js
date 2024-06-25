export const useAnimeStore = defineStore('AnimeStore', {
    state: () => ({
        Anime: [],
        CurrentAnime: [],
        CurrentAnimeFranshies: [],
        SearchingAnime: [],
        IsLoad: true
    }),
    actions: {
        async GET_ALL_ANIME_FROM_DB(){
            this.IsLoad = true
            const config = useRuntimeConfig()
            const data = await $fetch(`${config.public.AnimeApi}/title/updates?limit=15`, {
                server: false,
            })
            this.IsLoad = false
            this.Anime = data.list
            
        },
        async GET_ANIME_FROM_CODE(AnimeCode){
            this.IsLoad = true
            const config = useRuntimeConfig()
            //Тип для получения полной или только короткой инфы об аниме
            const data = await $fetch(`${config.public.AnimeApi}/title?code=${AnimeCode}`, {
                initialCache: false,
                lazy: false
            })
            this.IsLoad = false
            this.CurrentAnime = data
            
        },
        async GET_ANIME_FRANSHIES_INFO_FROM_CODE(AnimeCode){
            const config = useRuntimeConfig()
            const data = await $fetch(`${config.public.AnimeApi}/title?code=${AnimeCode}&filter=posters,code,names,id`, {
                initialCache: false
            })
            this.CurrentAnimeFranshies.push(data)
        },
        async GET_ANIME_FROM_TITLE(AnimeTitle){
            if (AnimeTitle.length != 0){
                const config = useRuntimeConfig()
                const data = await $fetch(`${config.public.AnimeApi}/title/search?search=${AnimeTitle}&limit=15`, {
                    initialCache: false
                })
                this.SearchingAnime = data.list.slice(0)
            } else {
                this.SearchingAnime = []
                return this.Anime
            }
        }

    },
    getters: {
        ANIME(){
            return this.Anime
        }
    }
})