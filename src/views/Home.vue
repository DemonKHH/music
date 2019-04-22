<template>
  <div class="home">
    <div class="nav">
      <ul class="nav-header">
        <li><router-link  to="/home/album">FEATURED</router-link></li>
        <li><router-link  to="/home/newalbum">PODCASTS</router-link></li>
        <li><router-link  to="/home/hotalbum">CHARTS</router-link></li>
        <li><router-link  to="/home/3">MOODS</router-link></li>
        <li><router-link  to="/home/4">NEW RELEASES</router-link></li>
        <li><router-link  to="/home/5">DISCOVER</router-link></li>
      </ul>
    </div>
    <div class="nav-body">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import {props} from '../App.vue'
export default {
data () {
  return {

  }
},
method:{
  gethistory(){
    console.log(props)
  }
},
Mounted () {
  this.gethistory();
}

}
</script>
<style scoped>
  .home{
    position: absolute;
    left:15%;
    width:85%;
    height:100%;
    background-color:rgba(255, 255, 255, 0.781);
  }
  .nav{
    height:15%;
    width:100%;
  }
  .nav-header{
    height:100%;
    width:85%;
  }
  .nav-header li{
    display: inline-block;
    padding:20px 20px 0 20px;
    height:40%;
    line-height: 40px;
  }
.nav-header a.router-link-exact-active {
  color: #000;
}
a:hover {
  color: rgb(37, 5, 5);
}
.nav-header li a.router-link-exact-active::before{
  content:'';
  display:inline-block;
  position: absolute;
  top:60px;
  height:0.6%;
  /* margin-left:1px; */
  width:80px;
  background-color:rgb(134,176,237);
}

</style>

