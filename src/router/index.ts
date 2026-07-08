import {
 createRouter,
 createWebHistory
} from '@ionic/vue-router'

const routes = [

{
 path:'/',
 redirect:'/login'
},

{
 path:'/login',
 component:()=>import('@/views/LoginPage.vue')
},

{
 path:'/register',
 component:()=>import('@/views/RegisterPage.vue')
},

{
 path:'/forgot-password',
 component:()=>import('@/views/ForgotPasswordPage.vue')
},

{
 path:'/album',
 component:()=>import('@/views/AlbumPage.vue')
},

{
 path:'/collection',
 component:()=>import('@/views/CollectionPage.vue')
},

{
 path:'/achievements',
 component:()=>import('@/views/AchievementsPage.vue')
},

{
 path:'/profile',
 component:()=>import('@/views/ProfilePage.vue')
}

]

export default createRouter({

 history:createWebHistory(
  import.meta.env.BASE_URL
 ),

 routes

})
