<template>
    <div>
      <ul>
        <li v-for="(item ,index) in data">
          <slot :row="item" :$index="index"></slot>
        </li>
      </ul>
    </div>
</template>

<script>

    export default {
        components: {},
     props:['data']
    }
</script>

<style>

</style>
