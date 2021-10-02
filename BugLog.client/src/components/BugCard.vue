<template>
  <div class="col-md-6">
    <router-link :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
      {{ bug.title }}
    </router-link>
  </div>
  <div class="col-md-6">
    <p class="card-text text-style">
      {{ bug.description }}
    </p>
  </div>
</template>

<script>
import { Bug } from '../Models/Bug.js'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
