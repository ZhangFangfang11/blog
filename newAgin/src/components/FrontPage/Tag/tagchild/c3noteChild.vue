<template>
    <div>
      <my-slot>
        <div slot="header" class="tt"  >
          <router-link to=""></router-link>
          <span>时间 :</span>
        </div>
        <div slot="conMain"  >
        </div>
      </my-slot>
    </div>
</template>

<script>
import mySlot from '@/components/FrontPage/solts.vue'
    export default {
        components: {
          mySlot
        }
    }
</script>

<style>

</style>
