<template>
  <div class="row">
    <div class="col-12">
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
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
