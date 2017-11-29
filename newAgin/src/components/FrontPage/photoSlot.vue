<template>
  <div>
    <div class="photo-slot">
      <div class="photoCover" >
        <slot name="coverImg">
        </slot>
      </div>
      <div class="coverDetail" style="height: 40px;background:none">
        <slot name="coverTitle"></slot>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    components: {}
  }
</script>

<style>
  .photo-slot {
    float: left;
    width: 200px;
    height: 160px;

    margin:0 0 30px 15px;
    cursor: pointer;
    padding: 4px 8px;
    display: block;
    border: 2px solid #fff;
    box-shadow: 2px 1px 1px 1px #918989;
  }

  .photo-slot .photoCover, .photo-slot .photoCover > div {
    width: 100%;
    height: 100%;
  }

  .photo-slot .photoCover img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .photo-slot .coverDetail {
    line-height: 40px;
    font-size: 16px;
    color: #333;

  }

</style>
