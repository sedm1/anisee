<template>
    <div>
        <TheHeader></TheHeader>
        <main>
            <div class="main">
                <div class="main__block">
                    <h1 class="main__title">Авторизация</h1>
                    <div class="main__form">
                        <div class="main__form-item">
                            <input 
                            type="text" 
                            placeholder="Введите никнейм" 
                            class="main__form-input" 
                            :class="Fields.Nickname ? '' : 'main__form-input-error'"
                            v-model="User.nickname">
                        </div>
                        <div class="main__form-item">
                            <input 
                            type="password" 
                            placeholder="Введите пароль" 
                            class="main__form-input" 
                            :class="Fields.Password ? '' : 'main__form-input-error'"
                            v-model="User.password"
                            >
                        </div>
                        <button class="main__form-button" @click="SubmitForm()">Войти</button>
                    </div>
                    <div class="main__login">Нет аккаунта? <NuxtLink to="/registration">Зарегистрироваться</NuxtLink></div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import {useUserStore} from '../stores/User'
useHead({
    title: "Страница авторизации"
})

const UserStore = useUserStore()
let User = reactive({
    nickname: '',
    password: '',
})
let Fields = reactive({
    Nickname: true,
    Password: true
})
function SubmitForm(){

    if (!User.nickname){
        Fields.Nickname = false;
        return;
    } else {
        Fields.Nickname = true;
    }
    if (!User.password){
        Fields.Password = false
        return;
    } else {
        Fields.Password = true
    }

    if (Fields.Nickname && Fields.Password){
        SendData()
    }
}
function SendData(){
    let data = new FormData;
    data.append('nickname', User.nickname)
    data.append('password', User.password)
    
    UserStore.LogUser(data)
}
</script>
<style lang="sass" scoped>
.main
    display: flex
    align-items: center
    justify-content: center
    height: calc( 100dvh -  100px)
    &__block
        background: #0A0C0C
        border-radius: 16px
        box-shadow: 0px 0px 88px 15px rgba(62,144,240,0.83)
        padding: 24px
        max-width: 500px
        width: 100%
    &__title
        font-size: 32px
        font-weight: 700
        text-align: center
    &__form
        margin-top: 30px
        &-item 
            margin-bottom: 15px
        &-input 
            width: 100%
            padding: 15px 15px
            border-radius: 5px
            border: 1px solid $gray 
            color: $white 
            &-error 
                border-color: $red
        &-button 
            width: 100%
            border-radius: 5px
            padding: 15px 0px
            font-size: 16px
            font-weight: 600
            background: $blue
            transition: .3s
            &:hover 
                box-shadow: 3px 3px 36px 1px rgba(62,144,240,0.67)
                transform: scale(1.03)
        &-error 
            color: $red
            font-size: 10px
            margin-top: 2px
    &__login 
        text-align: center
        margin-top: 20px
        a
            color: $blue
</style>