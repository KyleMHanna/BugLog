<template>
  <div class="component">
    <h5>
      Hi from bugs details
    </h5>
  </div>
  <BugCard v-for="b in bugs" :key="b.id" :bug="b" />
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { bugsService } from '../services/BugsService.js'
import Pop from '../utils/Pop.js'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const account = computed(() => AppState.account)
    const route = useRoute()
    async function getBugs() {
      try {
        await bugsService.getBugs({ bugId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    onMounted(async() => {
      getBugs({ bugId: route.params.id })
    })

    return {
      account,
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
