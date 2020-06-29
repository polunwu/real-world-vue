import Vue from "vue"
import VueRouter from "vue-router"
import EventCreate from "../views/EventCreate"
import EventList from "../views/EventList"
import EventShow from "../views/EventShow"
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true, // true: send params in as props
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event // pass event EventShow into component
        next()
      })
    }
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
