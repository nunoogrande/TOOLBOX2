<template>
  <div>
    <TheHeader @SideNavToggle="displaySideNave = !displaySideNave"/>
    <SideNav :show="displaySideNave" @close="displaySideNave=false"/>
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader"
import SideNav from "@/components/SideNav"

export default {
  components:{
    TheHeader,
    SideNav
  },
  data(){
    return{
      displaySideNave:false
    }
  }
}
</script>


<style>
  *{
    box-sizing: border-box;
  }
  body{
    margin-top: 5rem;
    font-family: "lato", sans-serif;
  }
  .main-content{
    margin-top: 4.5rem;
  }

</style>
