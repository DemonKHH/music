<template>
  <div class="home">
      <div class="homeContentHotAlbum">
        <h1>{{hotAlbumTitle || "waiting"}}</h1>
        <div class="albumImgs">
          <div class="albumImg" v-for="hotAlbum in hotAlbums" @click="album(hotAlbum.id)">
            <img :src="hotAlbum.coverImgUrl.replace('http','https')">
            <div class="playSvg">
              <svg data-v-7ba5bd90="" width="48" height="48" xmlns="http://www.w3.org/2000/svg"><g data-v-7ba5bd90=""><title data-v-7ba5bd90="">background</title><rect data-v-7ba5bd90="" fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"></rect></g><g data-v-7ba5bd90=""><title data-v-7ba5bd90="">play</title><rect data-v-7ba5bd90="" id="svg_3" height="23.269886" width="23.529401" y="12.671068" x="13.662634" stroke-width="1.5" stroke="#000" fill="#fff"></rect><path data-v-7ba5bd90="" id="svg_1" fill="none" d="m0,0l48,0l0,48l-48,0l0,-48z"></path><path data-v-7ba5bd90="" fill="#e82359" stroke-width="0" id="svg_2" d="m24,3.910474c-11.05,0 -20,8.95 -20,20s8.95,20 20,20s20,-8.95 20,-20s-8.95,-20 -20,-20zm-4,29l0,-18l12,9l-12,9z"></path></g></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="homeContentNewAlbum">
        <h1>{{newAlbumTitle || "waiting"}}</h1>
        <div class="albumImgs">
          <div class="albumImg" v-for="newAlbum in newAlbums" @click="album(newAlbum.id)">
            <img :src="newAlbum.coverImgUrl.replace('http','https')">
            <div class="playSvg">
              <svg data-v-7ba5bd90="" width="48" height="48" xmlns="http://www.w3.org/2000/svg"><g data-v-7ba5bd90=""><title data-v-7ba5bd90="">background</title><rect data-v-7ba5bd90="" fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"></rect></g><g data-v-7ba5bd90=""><title data-v-7ba5bd90="">play</title><rect data-v-7ba5bd90="" id="svg_3" height="23.269886" width="23.529401" y="12.671068" x="13.662634" stroke-width="1.5" stroke="#000" fill="#fff"></rect><path data-v-7ba5bd90="" id="svg_1" fill="none" d="m0,0l48,0l0,48l-48,0l0,-48z"></path><path data-v-7ba5bd90="" fill="#e82359" stroke-width="0" id="svg_2" d="m24,3.910474c-11.05,0 -20,8.95 -20,20s8.95,20 20,20s20,-8.95 20,-20s-8.95,-20 -20,-20zm-4,29l0,-18l12,9l-12,9z"></path></g></svg>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="homeContentTopAlbum">
        <h1>Top Songs</h1>
        <div class="albumImgs">
          <div class="albumImg" v-for="topAlbum in topAlbums">
            <img :src="topAlbum.coverImgUrl">
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import axiosLoading from '../assets/common/axiosLoading.js'
export default {
data () {
  return {
    hotAlbumTitle:'',
    hotAlbums:[],
    newAlbumTitle:'',
    newAlbums:[],
    topSongs:[],
  }
},
  methods: {
    album(id){
      this.$router.push({
              name: 'album',
              params: {
               id: id
              }
            })
      this.$store.state.albumId =id;
    },
   hotAlbum(){
     var requrl= '/top/playlist/highquality?limit=4';
     axiosLoading(this.$http,requrl,res=>{
                // console.log(res.data)
                this.hotAlbumTitle='Highquality';
                this.hotAlbums = res.data.playlists;
     })
    
      },
   newAlbum(){
     var requrl= '/top/playlist?limit=4&order=new';
     axiosLoading(this.$http,requrl,res=>{
                this.newAlbumTitle='News';
                this.newAlbums = res.data.playlists;
     })
    
      },
       topAlbum(){
     var requrl= '/top/song?limit=10&type=0';
     axiosLoading(this.$http,requrl,res=>{
                this.topSongs = res.data;
                // console.log(this.topSongs)
     })
    
      }
},
beforeMount () {
  this.hotAlbum();
  this.newAlbum();
  this.topAlbum();
}
}
</script>
<style scoped>
img{
  height:100%;
  width:100%;
  border-radius:10px 10px 10px 10px;
  box-shadow: 6px 8px 2px #171b1c;
  cursor: pointer;
}
h1{
  text-align: left;
  margin:10px;
}
  .home{
    display:flex;
    flex-direction:column;
    vertical-align: center; 
    align-items: center;
    margin-bottom:50%;
    width:100%;
    height:100%;
  }
  .homeContentHotAlbum,
  .homeContentNewAlbum,
  .homeContentTopAlbum{
    height:100%;
    width:100%;
    margin:10px;
  }
  .albumImgs{
    width:100%;
    display:flex;
    flex-direction:row;
    vertical-align: center; 
    align-items: center;
  }
  .albumImgs .albumImg{
    height:100%;
    width:100%;
    padding:10px;
    transition:0.4s;
  }
  .playSvg{
    /* position: absolute; */
    height:50px;
    width:100%;
    margin-top:-50px;
    display: flex;
    flex-direction: row-reverse;
  }
   .playSvg svg{
     height:0;
     width:0;
     transition: 0.4s;
   }
  .albumImgs .albumImg:hover img{
    opacity: 0.5;
  }
 .homeContentHotAlbum .albumImgs .albumImg:hover .playSvg svg{
    height:100%;
    width:100%;
  }
  .homeContentNewAlbum .albumImgs .albumImg:hover .playSvg svg{
    height:100%;
    width:100%;
  }
</style>

