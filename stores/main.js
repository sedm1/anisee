export const UseMainStore = defineStore('MainStore', {
    state: () => ({
        LastUpdatedAnime: [],
        ScheduleAnime: [],
        IsScheduleLoading: true
    }),
    actions:{
        async GET_LAST_UPDATED_ANIME(){
            try {
                const config = useRuntimeConfig()
                const LastUpdatedAnimeData = await $fetch(`${config.public.AnimeApi}/title/updates?limit=8&filter=posters,code`)
                
                this.LastUpdatedAnime = LastUpdatedAnimeData.list
            } catch(err){
                console.log('Неудалось получить аниме: ' + err)
                return err
            }
        },
        async GET_SCHEDULE_ANIME(day){
            this.IsScheduleLoading = true
            try {
                const config = useRuntimeConfig()
                const ScheduleAnimeData = await $fetch(`${config.public.AnimeApi}/title/schedule?filter=posters,code&days=${day}`)

                this.ScheduleAnime = ScheduleAnimeData[0].list
                this.IsScheduleLoading = false
            } catch(err){
                console.log('Неудалось получить расписание аниме: ' + err)
                return err
            }
        }
    }
})