<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-if="trackedbugs">
    <TrackedBugCard v-for="b in trackedbugs" :key="b.id" :bug="b" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import { useRoute } from 'vue-router'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await accountService.TrackedBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      trackedbugs: computed(() => AppState.trackedbugs),
      bugs: computed(() => AppState.trackedbugs)

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
