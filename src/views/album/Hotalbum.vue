<template>
  <div class="albumcontent">
           <h1>{{albumTitle}}</h1>
      <div class="content">
        <div v-for="album in albums" class="albums">
          <div class="album">
            <div class="albumimg">
              <a><img :src="album.img" @click="setPlaylistTitle(album.name);setSongId(album.id)"></a>
            </div>
            <div class="albumtitle">
              <p>{{album.name}} </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// @ is an alias to /src
import {reqdata} from '../../assets/common/reqdata.js'
import { mapActions } from 'vuex'
export default {
data () {
  return {
    albumTitle:'',
    albums:[
    ]
  }
},
  methods: {
   imgurl(){
     var requrl= 'https://api.itooi.cn/music/netease/songList?key=579621905&id=2884035&limit=50&offset=0';
    reqdata(requrl,res=>{
      this.albumTitle=res.albumTitle
      this.albums = res.albums;
    })
    
      },
       ...mapActions([
      'setSongId', 
      'setPlaylistTitle' 
      ])
},
beforeMount () {
  this.imgurl();
}
}
</script>
<style scoped>
#nav-bar a.router-link-exact-active {
  color: #000;
}
a:hover {
  color: rgb(37, 5, 5);
}
.nav-body h1{
  text-align: left;
  margin-left:40px;
}
a.router-link-exact-active {
  color: #000;
}
.albums{
  height:100%;
  padding-bottom: 20px;
  display: inline-flex;
  flex-direction: column-reverse;
  margin:20px;
  height:160px;
  width:200px;
}
.album {
  height:100%;
  width:100%;
}
.albumimg{
  height:100%;
  width:100%;
}
.albums img{
  height:100%;
  width:100%;
  cursor: pointer;
}
.albums .album .albumtitle{
  margin:10px;
}
</style>