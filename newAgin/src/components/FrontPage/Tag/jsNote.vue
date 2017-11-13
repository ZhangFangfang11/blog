<template>
    <div>
      <my-slot  v-for="(item,index) in tagAry" :key="index">
        <div slot="header" class="tt">
          <router-link :to="{name:'jschild',params:{id:item.id}}">{{item.tagTitle}}</router-link>
          <span>时间 :{{item.tagTime}}</span>
        </div>
        <div slot="conMain" class="tc">
          {{item.tagContent}}
        </div>
      </my-slot>
     <router-view></router-view>
    </div>
</template>

<script>
import mySlot from '../solts.vue'
    export default {
        components: {
          mySlot
        },
      data(){
            return {
              tagAry: [{
                id: 1,
                tagName: 'Javascript',
                tagTitle: 'Javascript介绍',
                tagContent: "<router-link> 组件支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。",
                tagTime: '2017-11-10'
              },
                ]
            }
      }
    }
</script>

<style>
  .tt {
    position: relative;
  }
  .tc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .tt > span {
    position: absolute;
    top: 0;
    right: 13px;
  }
</style>
