<template>
<div class="searchBox" @click="search()">
    <div class="artists">
        <h1>Artists</h1>
        <div class="content">
            <div class="artist">
                <img :src="artists.replace('http','https')" alt="">
            </div>
        </div>
    </div>
    <div class="songs">
        <h1>Songs</h1>
        <div class="content" v-for="song in songs">
            <div class="contentImg">
                <img :src="song.al.picUrl.replace('http','https')" alt="">
            </div>
            <div class="contentSongs">
                <div class="songNames" @click="getSongId(song.id,song.name,song.ar[0].name,song.al.picUrl)">
                    <p>{{song.name||"songName"}}</p>
                </div>
                <div class="singerNames">
                    <p>{{song.ar[0].name||"songName"}}</p>
                </div>
            </div>
            <!-- <div class="albumNames">
                <p>{{song.album.name ||"albumName"}}</p>
            </div>
            <div class="songTime">
                <p>00:00</p>
            </div> -->
        </div>
    </div>
    <!-- <div class="albums">

    </div> -->
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
data(){
        return {
           artists:"",
           songs:[],
           albums:[]
        }
    },
methods:{
getSongId(id,name,singer,albumImgUrl){
    this.$store.state.id=id;
    this.$store.state.songName=name;
    this.$store.state.singer=singer;
    this.$store.state.albumImgUrl=albumImgUrl;
    },
search(albumId){
var id=albumId || this.$router.currentRoute.params.id;
  var axios = this.$http
  var axiosCreate =  axios.create({
      baseURL :'https://music.api.umcoder.com',
      timeout:5000
  })
  axiosCreate.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
//   this.select('.loading').style.display = 'block'
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})

//添加响应拦截器
axiosCreate.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
//   setTimeout(()=>{
//       this.select('.loading').style.display = 'none'
//   },500)
  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})
axiosCreate.get(`/playlist/detail?id=${id}`)
            .then(res=>{
            if(res.status== 200){
            //   console.log(res.data.playlist.tracks);
              this.songs=res.data.playlist.tracks;
              this.artists=res.data.playlist.coverImgUrl;
              this.albums=res.data.playlist.tracks;
              // console.log(this.songs,this.artists,this.albums);
            }
        }).catch(err=>{
              console.log(err)
            })
},
    // select(ele){
    //   return document.querySelector(ele)
    // },
    // rplay(id,name){
    //     this.$store.dispatch('setSongId',id)
    //     this.$store.dispatch('setPlaylistTitle',name)
    // }
    },
    watch:{   
        getAlbumId(curval,oldval){
            console.log(curval,oldval)
        if(!curval)
        this.search(oldval);
        else
        this.search(curval);
        }
},
computed:{    
            ...mapGetters([
              'getAlbumId'
            ])  
},
beforeMount(){
  this.search(this.$store.state.albumId);
}

}

</script>
<style scoped>
img{
  height:100%;
  width:100%;
  border-radius:10px 10px 10px 10px;
  box-shadow: 4px 4px 5px black;
  cursor: pointer;
}
h1{
  text-align: left;
}
.searchBox{
    display:flex;
    flex-direction:column;
    vertical-align: center; 
    align-items: center;
    margin-bottom:50%;
    width:100%;
    height:100%;
  }
.artists,
.songs,
.albums{
    height:100%;
    width:100%;
    margin:10px;
    display:flex;
    flex-direction:column;
    vertical-align: center; 
  }
  .contentImg{
    height:100%;
    width:20px;
  }
.content{
    height:100%;
    width:100%;
    margin:10px;
    display:flex;
    flex-direction:row;
    vertical-align: center; 
  }
.artists{
    width:100%;
    /* padding:40px; */
  }
  .artists img{
      height:250px;
      width:250px;
  }
 .artists .artist{
     padding:10px;
  }
  .songs{
      display:flex;
      flex-direction: column;
  }
  .songs .content{
      flex-direction: row;
      text-indent: 16px;
      transition: 0.2s;
      padding:10px 0;
  }
.songs .content .contentSongs{
    display: flex;
    vertical-align: center;
    align-items:center;
    width:100%;
    margin:auto;
    text-align:left;
}
.songs .content .contentSongs .songNames{
  width:50%;
}
  .songs .content .contentImg{
    height:50px;
    width:50px;
  }
.songs .content .contentImg img{
      border-radius: 1px;
        box-shadow: 1px 1px 5px black;
    }
  .contentImg{
    margin-right:20px;
  }
  .songs .content:hover{
      background:rgb(30,52,76);
  }
.songs .content p{
    cursor: pointer;
}


</style>



