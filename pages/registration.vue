<template>
    <div>
        <TheHeader></TheHeader>
        <main>
            <div class="main">
                <div class="main__block">
                    <h1 class="main__title">Регистрация</h1>
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
                            type="text" 
                            placeholder="Введите email" 
                            class="main__form-input" 
                            :class="Fields.Email ? '' : 'main__form-input-error'"
                            v-model="User.email">
                        </div>
                        <div class="main__form-item">
                            <input 
                            type="password" 
                            placeholder="Введите пароль" 
                            class="main__form-input" 
                            :class="IsPasswordsEqual ? '' : 'main__form-input-error'"
                            v-model="User.password"
                            >
                            <p class="main__form-error" v-if="!IsPasswordsEqual">Пароли не совпадают или незаполнены</p>
                        </div>
                        <div class="main__form-item">
                            <input 
                            type="password" 
                            placeholder="Введите пароль повторно" 
                            class="main__form-input" 
                            :class="IsPasswordsEqual ? '' : 'main__form-input-error'"
                            v-model="User.secondPassWord"
                            >
                            <p class="main__form-error" v-if="!IsPasswordsEqual">Пароли не совпадают или незаполнены</p>
                        </div>
                        <button class="main__form-button" @click="SubmitForm()">Зарегистрироваться</button>
                    </div>
                    <div class="main__login">Уже есть аккаунт? <router-link to="/login">Войти</router-link></div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
useHead({
    title: "Страница регистрации"
})
let User =  reactive({
    nickname: '',
    email: '',
    password: '',
    secondPassWord: ''
})
let Fields = reactive({
    Nickname: true,
    Email: true
})
let IsPasswordsEqual = ref(true)

function SubmitForm(){
    if (!User.nickname){
        Fields.Nickname = false;
        return;
    } else {
        Fields.Nickname = true;
    }

    if (!User.email){
        Fields.Email = false;
        return ;
    } else {
        Fields.Email = true;
    }
    
    if (User.password != User.secondPassWord || !User.password){
        IsPasswordsEqual.value = false
        return;
    } else {
        IsPasswordsEqual.value = true
    }

    if (Fields.Nickname && Fields.Email && IsPasswordsEqual){
        SendData()
    }
}

function SendData(){
    let data = new FormData;
    data.append('nickname', User.nickname)
    data.append('email', User.email)
    data.append('password', User.password)
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