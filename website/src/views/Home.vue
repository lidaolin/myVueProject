<template>
  <div class="home ">
    <div class="dl-title">111111111111111111111111</div>
    <div class="dl-subtitle">
    222222222222222</div>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import {login} from '@/api'
import {resdd} from '@/components/bgCavaer/ribbon.js'
export default {
  name: 'Home',
  components: {
  },mounted() {
    resdd()
    login().then(res=>{
      console.log(res)
    })
  },
  destroyed() {
    console.log('w要结束了')
  },
}
</script>
<style lang="scss" scoped>
  // .home{ color:$color; }
</style>
