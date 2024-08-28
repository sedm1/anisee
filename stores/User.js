
export const useUserStore = defineStore('UserStore', {
    state: () => ({
        Favourites: [],
        FavouritesAnimeList: []
    }),
    actions: {
        SET_ANIME_TO_FAVOURITES(AnimeDataId){
            this.Favourites.push(AnimeDataId)
        },
        REMOVE_ANIME_FROM_FAVOURITES(AnimeDataId){
            let index = this.Favourites.indexOf(AnimeDataId)
            this.Favourites.splice(index, 1)
        },
        async GET_FAVOURITES_ANIME_LIST(){
            const config = useRuntimeConfig()
            try {
                for (let i = 0; i < this.Favourites.length; i++){
                    const AnimeInfo = await $fetch(`${config.public.AnimeApi}/title?id=${this.Favourites[i]}&filter=posters,code,names`, {
                        lazy: true,
                        server: false
                    })
                    this.FavouritesAnimeList.push(AnimeInfo)
                }
            }
            catch(err){
                console.log('Неудлось получить франшизу аниме' + err)
                return err
            }
        }
    },
    persist: {
        storage: persistedState.localStorage
    },
})