<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import store from '@/store'

export default {
  props: ['id'],
  beforeRouteEnter(routeTo, routeFrom, next) {
    // This is 'Navigation Guards' from vue-router life-cycle

    NProgress.start()
    // We CAN NOT access to 'this' and mapActions here
    // Because 'beforeRouteEnter' is exicuted bofore the component 'created'
    // Use store to dispatch actions
    store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
      NProgress.done()
      // Continue navigation
      // Continue component life-cycle like 'create'
      // This means conponent template will be created after the data returned
      next()
    })
  },
  computed: mapState({
    event: state => state.event.event
  })
}
</script>

<style lang="scss" scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
