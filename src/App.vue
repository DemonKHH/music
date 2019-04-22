<template>
  <div id="app" tabindex='1' @keyup.ctrl.38="addVolume" @keyup.ctrl.40="decreaseVolume">
    <div id="nav-bar">
      <div id="nav-header">
        <div id ="logo">
          <img src="./assets/logo.png">
          <!-- <svg @click="close" id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24"><path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"/></svg> -->
        </div>
      </div>
      <div id="nav-group">
        <ul>
          <li class="nav-group">
            <div class="nav-item">
                <div class="nav-item-home-link">
                    <div class="link">
                       <svg class="svg-ico" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M 256.274 60.84 L 84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73 L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222 165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L 448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062 L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274 35.95 Z" fill="currentColor"></path></svg>
                        <router-link to="/home">Home</router-link>
                    </div>
                </div>
            </div>
          </li>
          <li class="nav-group">       
            <div class="nav-item">
                <div class="nav-item-home-link">
                  <div class="link">
                     <svg class="svg-ico" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor" fill-rule="evenodd"></path></svg>
                       <router-link to="/search">Search</router-link>
                  </div>
             
                </div>
            </div></li>
          <li class="nav-group">       
            <div class="nav-item">
                <div class="nav-item-home-link">
                  <div class="link">
                    <!-- <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M94.4,91.6c0.8,0.8,0.8,2,0,2.8C94,94.8,93.5,95,93,95s-1-0.2-1.4-0.6L50,52.8L8.4,94.4C8,94.8,7.5,95,7,95s-1-0.2-1.4-0.6	c-0.8-0.8-0.8-2,0-2.8L47.2,50L5.6,8.4c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0L50,47.2L91.6,5.6c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8L52.8,50L94.4,91.6z"/></svg> -->
                       <svg class="svg-ico" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z" fill="currentColor"></path></svg>                     
                      <router-link to="/demo">Your Library</router-link>
                  </div>
                </div>
            </div></li>
        </ul>
        <div class="historylist" v-show="count">
          <router-link to="/historylist">historylist</router-link>
        </div>
      </div>
      <div id="login">
      <router-link tag="button" to="/login">Login</router-link>
      <button @click="neteaseCloudLogin">Netease Cloud</button>
      </div>
    </div>
    <diV class="playlistpage">
          <router-view></router-view>
    </diV>
    <div class="box">
      <div class="playcontrol">
          <div class="previous">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </div>
          <div class="play" v-show="bool" @click="cpause">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause-circle"><circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line></svg>            
          </div>
          <div class="pause" v-show="!bool"  @click="cplay">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          </div>
          <div class="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </div>
      </div>
      <diV class="playingName" v-show="bool">
        <p >正在播放 {{name}}</P>
      </div>
        <diV class="progressbar">
            <div class="currentTime">
              <p>{{currentTime}}/</p>
            </div>
             <div class="dprogress">
               <div class="cprogress"></div>
             </div>
              <div class="duration">
                <p>{{duration}}</p>
            </div>

        </div>
        <audio @canplay="getDuration" @timeupdate="updateTime" id="player"></audio>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
data: function () {
  return {
    duration:'00:00',
    currentTime:'00:00',
    count:0,
    name:'歌曲',
    playlist:{},
    bool:false
  }
},
methods: {
    cplay(){
          if(this.$store.getters.getSongId==''){
      alert('还没有点击歌曲哦')
    }else{
          var audio = document.getElementById('player');
        if(this.bool==false){
              this.bool=!this.bool;
        }
      audio.play();
      // console.log('开始播放');
    }

  },
  cpause(){
        var audio = document.getElementById('player');
        if(this.bool==true){
              this.bool=!this.bool;
        }
        console.log(audio.error)
        audio.pause();
            // console.log('停止播放')
  },
  neteaseCloudLogin(){
    console.info("网易云登陆")
  },
  audioplay(){
      var audio = document.getElementById('player');
      audio.src = `https://api.itooi.cn/music/netease/url?key=579621905&id=${this.$store.getters.getSongId}&br=999000`
      this.cplay()

  },
      getDuration(e) {
      //  console.log(e.target.duration); //此时可以获取到duration
       this.duration = this.timeToStr(e.target.duration.toFixed(0));
    },

    updateTime(e) {
       this.currentTime =this.timeToStr(e.target.currentTime.toFixed(0));  //获取audio当前播放时间
      this.changeProgress(e.target.currentTime.toFixed(0),e.target.duration.toFixed(0));
      this.audioSatus()
    },
    changeProgress(cur,dur){
              var cprogress= document.getElementsByClassName('cprogress')[0];
            cprogress.style.width = cur/dur*100+"%"
            },
    timeToStr(time) {
         var  m = 0,
              s = 0,
              _h = '00',
              _m = '00',
              _s = '00';
          time = Math.floor(time % 3600);
          m = Math.floor(time / 60);
          s = Math.floor(time % 60);
          _s = s < 10 ? '0' + s : s + '';
          _m = m < 10 ? '0' + m : m + '';
          return _m + ":" + _s;
      },
      audioSatus(){
              var audio = document.getElementById('player');
              if(audio.ended){
                     this.currentTime='00:00'
                     var cprogress= document.getElementsByClassName('cprogress')[0];
                     cprogress.style.width=0; 
                     this.cpause()
              }
      },
     addVolume(){
              var audio = document.getElementById('player');
              if(audio.volume<=1)
                 audio.volume +=0.2;  
              else
              alert('顶不住啦')       
      },
      decreaseVolume(){
              var audio = document.getElementById('player');
        if(audio.volume>0 )
            audio.volume -=0.2;           
        else
            alert('顶不住啦')  
      }

},
beforeMount () {
  console.log(`^_^^_^^_^^_^^_^`)
      console.info('    更新的功能')        
      console.info('    播放功能')
      console.info('    历史表单')     
      console.info('    搜索功能')      
      console.info('    播放当前歌曲名')   
      console.info('    播放进度条')      
      console.log(`ctrl+↑ || ctrl+↓ 控制音量加减`)
  console.log(`^_^^_^^_^^_^^_^`)


},
watch:{   
          getSongId(curval,oldval){ 
            this.$store.state.historylists.push({id:`${this.$store.state.id}`,name:`${this.$store.state.playingName}`})
            this.changeProgress()
            // console.log(this.historylists[this.count][0]);
            // this.historylists[this.count].push([{id:oldval}])
            // console.log(`新id值${curval}--旧id值${oldval}`);
            // console.log(this.count);
            // console.log(this.historylists[this.count][0].name);
            this.count++;
            this.audioplay();
          },
           getPlaylistTitle(curval,oldval){ 
             this.name = curval;
            // this.historylists[this.count].push([{name:oldval}])
            // console.log(`新歌名${curval}--旧歌名${oldval}`);
          }


},
computed:{    
            ...mapGetters([
              'getSongId',
              'getPlaylistTitle',
            ])  
          // getorderid(){
          //   return this.$store.state.id;
          // },
          // getordername(){
          //   return this.$store.state.playingName;
          // }

}
  }
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo{
  height:6%;
  width:50%;
  margin:auto;
  padding:20px
}
#logo img{
  height:100%;
  width:100%;
}
#nav-bar {
  position:fixed; 
    height:100%;
    width:15%;
    background-color:#ececef;
    overflow: hidden;
}
#nav-group ul li{
  height:100%;
    margin:10px;
}
#nav-bar a{
  line-height:30px;
}
#nav-bar a.router-link-exact-active {
  color: #000;
}
#nav-bar a.router-link-exact-active::before{
  content:'';
  display:inline-block;
  position:absolute;
  left:3%;
  height:4%;
  width:2%;
  background-color:#86eda2;
}
#nav-group ul li:hover{
  cursor: pointer;
}
.svg-ico{
  position: absolute;
  left:15%;
  margin:auto;
  vertical-align: bottom;
}
#login{
  position: absolute;
  height:10%;
  width:100%;
  bottom:15%;
}
button{
  height:50%;
  width:60%;
  margin-top:10px;
  color:#898999;
  border-radius: 5px;
  border:1px solid #fff;
  cursor:pointer
}
.box{
  position:fixed;
  bottom:0;
  height:60px;
  left:15%;
  width:85%;
  background-color:rgb(236,237,239);
}
.play,
.pause{
  position: absolute;
  top:50%;
  left:53%;
  transform:translate(-50%,-50%);
  height:50px;
  width:50px;
  border-radius:100%;
    cursor: pointer;
}
.previous,
.next{
 position: absolute;
  top:50%;
  transform:translate(-50%,-50%);
  height:50px;
  width:50px;
  border-radius:100%;
  cursor: pointer;
}
.previous{
     left:48%;
}
.next{
      left:58%;
}




.playingName{
  position: absolute;
    top:50%;
    left:10%;
    transform:translate(-50%,-50%);
}
.historylist{
  margin-top:20px;
}


.progressbar{
  position: absolute;
  top:50%;
  left:32%;
  transform:translate(-50%,-50%);
  height:40px;
  width:290px;
  /* border:1px solid black;
  border-radius:10px;
  cursor: pointer; */
}
.progressbar .dprogress{
  position: absolute;
  top:50%;
  left:35%;
  transform:translate(-50%,-50%);
  height:8px;
  width:200px;
  background-color:rgb(101,109,120);
  border-radius:10px;
  cursor: pointer;
}
.progressbar .duration{
   position: absolute;
   bottom:2%;
  left:92.5%;
  transform:translate(-50%,-50%);
  cursor: pointer;
}
/* .progressbar .currentTime::before{
  content:'/';
  position: absolute;
  left:100%;
} */
.progressbar .currentTime{
   position: absolute;
   bottom:2%;
  left:78%;
  transform:translate(-50%,-50%);
  cursor: pointer;
}
.progressbar .dprogress .cprogress{
  height:100%;
  width:0%;
  background-color:rgb(134,176,237);
  border-radius: 10px;
}

</style>