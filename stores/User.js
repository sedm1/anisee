import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
export const useUserStore = defineStore('UserStore', {
    state: () => ({
        User: {
            UserId: '',
            UserName: '',
            UserAvatar: ''
        },
        Favorites: []
    }),
    actions: {
        LogUser(UserData){
            try{
                const config = useRuntimeConfig()
                const $toast = useToast();
                $fetch(config.public.Backend + '/backend/login.php', {
                    method: 'POST',
                    body: UserData
                }).then((res) => {
                    if (res.status == 0){
                        this.User.UserId = res.HashId
                        this.User.UserName = res.UserName
                        this.User.UserAvatar = res.UserAvatar
                        $toast.success('Авторизация прошла успешно', {
                            position: 'top-right'
                        })
                        setTimeout(() => {
                            navigateTo('/anime')
                        }, 200)
                        
                    } else {
                        $toast.warning('Такого пользователя не существует', {
                            position: 'top-right'
                        })
                    }
                })
                .catch((err) => {
                    console.log('Ошибка при авторизации 2: ' + err);
                    return err;
                })
                
            } catch(err) {
                console.log('Ошибка при авторизации 1: ' + err);
                return err;
            }
        },
        RegUser(UserData){
            console.log(UserData)
        },
        SetAnimeToFavorites(AnimeId){
            const $toast = useToast();
            this.Favorites.push(AnimeId)
            $toast.success('Аниме добавлено в избранное', {
                position: 'top-right'
            })
        },
        DeleteAnimeFromFavorites(AnimeId){
            const $toast = useToast();
            this.Favorites = this.Favorites.filter((FavoritesAnimeId) => FavoritesAnimeId !== AnimeId);
            $toast.success('Аниме было удалено', {
                position: 'top-right'
            })
        }
    },
    getters: {
        USER(){
            return this.User
        }
    },
    persist: {
        storage: persistedState.localStorage,
    }
})