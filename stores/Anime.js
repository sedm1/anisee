export const useAnimeStore = defineStore('AnimeStore', {
    state: () => ({
        Anime: [],
        CurrentAnime: [],
        IsLoad: true
    }),
    actions: {
        async GET_ALL_ANIME_FROM_DB(){
            this.IsLoad = true
            const config = useRuntimeConfig()
            const data = await $fetch(`${config.public.AnimeApi}title/updates?limit=15`, {
                server: false,
            })
            this.Anime = data.list
            this.IsLoad = false
        },
        async GET_ANIME_FROM_CODE(AnimeCode){
            this.IsLoad = true
            const config = useRuntimeConfig()
            const data = await $fetch(`${config.public.AnimeApi}title?code=${AnimeCode}`, {
                initialCache: false,
                lazy: false
            })
            this.CurrentAnime = data
            this.IsLoad = false
        }

    },
    getters: {
        ANIME(){
            return this.Anime
        }
    }
})