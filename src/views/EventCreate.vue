<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      ></BaseSelect>
      <template v-if="$v.event.category.$error">
        <p class="errorMessage" v-if="!$v.event.category.required">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        placeholder="Title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      ></BaseInput>
      <template v-if="$v.event.title.$error">
        <p class="errorMessage" v-if="!$v.event.title.required">
          Title is required.
        </p>
      </template>

      <BaseInput
        label="Description"
        type="text"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      ></BaseInput>
      <template v-if="$v.event.description.$error">
        <p class="errorMessage" v-if="!$v.event.description.required">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        type="text"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      ></BaseInput>
      <template v-if="$v.event.location.$error">
        <p class="errorMessage" v-if="!$v.event.location.required">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      ></BaseSelect>
      <template v-if="$v.event.time.$error">
        <p class="errorMessage" v-if="!$v.event.time.required">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p class="errorMessage" v-if="$v.$anyError">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEventObject(),
      categories: this.$store.state.categories
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
