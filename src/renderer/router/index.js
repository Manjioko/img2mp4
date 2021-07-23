import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: require('@/components/Home').default
    },
    {
      path: '/img2mp4',
      name: 'img2mp4',
      component: require('@/components/FunctionPage/img2mp4').default
    },
    {
      path: '/imgConvert',
      name: 'imgConvert',
      component: require('@/components/FunctionPage/imgConvert').default
    },
    {
      path: '/videoConvert',
      name: 'videoConvert',
      component: require('@/components/FunctionPage/videoConvert').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
