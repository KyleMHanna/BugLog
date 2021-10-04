<template>
  <div class="row" v-if="trackedbugs">
    <div class="col-md-2">
      <img :src="bug.creator.picture" class="rounded-circle image-fluid img-thumbnail img-height shadow">
      <p>{{ bug.creator.name }}</p>
    </div>
    <div class="col-md-10">
      <div class="card">
        <div class="card-body ">
          <h5 class="card-title title-style">
            {{ bug.title }}
          </h5>
          <div contenteditable="true">
            <p class="card-text text-style">
              {{ bug.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
