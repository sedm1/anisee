export const useUserStore = defineStore('UserStore', {
    state: () => ({
        User: {
            UserId: '',
            UserName: ''
        }
    }),
    actions: {
        LogUser(UserData){
            try{
                const config = useRuntimeConfig()
                $fetch(config.public.Backend + 'login.php', {
                    method: 'POST',
                    body: UserData
                }).then((res) => {
                    if (res.status == 0){
                        this.User.UserId = res.HashId
                        this.User.UserName = res.UserName
                    } else {
                        console.log('Такого аккаунта не существует')
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