export const useUserStore = defineStore('UserStore', {
    state: () => ({
        Favourites: []
    }),
    actions: {
        SET_ANIME_TO_FAVOURITES(AnimeData){
            this.Favourites.push(AnimeData)
        },
        REMOVE_ANIME_FROM_FAVOURITES(AnimeData){
            let index = this.Favourites.indexOf(AnimeData)
            this.Favourites.splice(index, 1)
        }
    }
})