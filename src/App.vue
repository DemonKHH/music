<template>
  <div id="app" tabindex='1' @keyup.ctrl.38="addVolume" @keyup.ctrl.40="decreaseVolume">
    <nav class="navbar">
        <div class="content">
            <div class="content-icon" @click="toggleMenu()">
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                    <g fill="#fff">
                        <rect x="6" y="22" width="36" height="4"/>
                        <rect x="6" y="10" width="36" height="4"/>
                        <rect x="6" y="34" width="36" height="4"/>
                    </g>
                </svg>
            </div>
            <div class="content-logo">
              <img src="https://i.loli.net/2019/06/02/5cf36877caa2156730.jpg" alt="">
            </div>
            <div class="content-search">
                  <div class="search-icon">
                      <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="searchIconTitle searchIconDesc" stroke="#fff" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#fff"> 
                          <path d="M14.4121122,14.4121122 L20,20"/> <circle cx="10" cy="10" r="6"/> 
                      </svg>
                  </div>
                <div class="mInputText">
                      <input type="search" placeholder="Search" class="searchContent" v-model="searchWords"  @keyup.enter="search(searchWords)">
                </div>
            </div>
            <div class="content-login">
                <button @click="loginAnimation()">{{user||"LOG IN"}}</button>
            </div>
        </div>
    </nav>
    <aside class="menu">
        <ul>
          <li>
            <div class="menu-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
                <polyline fill="none" stroke="#fff" stroke-miterlimit="10" points="23.5,11.5 12,4.5 0.5,11.5 "/>
                <path fill="#fff" d="M12,6.502l-10,6V24h20V12.502L12,6.502z M15,22H9v-9h6V22z"/>
                <polygon fill="#fff" points="20,9.37 18,8.152 18,4 20,4 "/>
              </svg>
            </div>
            <div class="menu-content">
                <router-link to="/home">Home</router-link>
            </div>
          </li>
          <li>
            <div class="menu-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
                <polyline fill="none" stroke="#fff" stroke-miterlimit="10" points="23.5,11.5 12,4.5 0.5,11.5 "/>
                <path fill="#fff" d="M12,6.502l-10,6V24h20V12.502L12,6.502z M15,22H9v-9h6V22z"/>
                <polygon fill="#fff" points="20,9.37 18,8.152 18,4 20,4 "/>
              </svg>
            </div>
            <div class="menu-content">
                <router-link to="/home">Home</router-link>
            </div>
          </li>
        </ul>
    </aside>
    <div class="lyricsPage">
        <div class="closeItem" @click="hiddenLyricPage()">
          <p>&times;</p>
        </div>
        <div class="lyricContent">
          <div class="leftContent">
            <div class="topBox">
              <div class="imgBox">
                <img :src="albumImgUrl" alt="">
              </div>
              <div class="playerControl-progress">
                <div class="currentProgress"></div>
              </div>
              <div class="timeShow">
                  <p class="leftTime">{{currentTime}}</p>
                  <p class="rightTime">{{duration}}</p>
              </div>
              <div class="songBox">
                <p>{{name ||""}}</p>
                <p>{{singer ||""}}</p>
                <p>{{album ||""}}</p>
              </div>
            </div>
            <div class="bottomBox"></div>
          </div>
          <div class="rightContent">
            <div class="lyricsTitle">
              <h2>Lyrics</h2>
            </div>
            <div class="lyricsContent">
              <p v-for="Lyric in lyric">{{Lyric[1]||"sorry,the lyrics is missing"}}</p>
            </div>
          </div>
        </div>
    </div>
    <diV class="playlistpage" v-show="page">
          <router-view></router-view>
    </diV>
    <div class="player-bar" v-show="show">
        <div class="player-songImg" @click="showLyricPage()">
              <img :src="albumImgUrl" alt="">
        </div>
        <div class="player-control">
            <div class="playerControl-progress">
                <div class="currentProgress"></div>
            </div>
            <div class="playerControl-content">
                <div class="songContent">
                  <div class="songName"><p>{{name ||""}}</p></div>
                  <div class="singer"><p>{{singer ||""}}</p></div>
                  <div class="songDetalis"><p>{{album ||""}}</p></div>
                </div>
                <div class="controlContent">
                  <div class="lyric">
                    <p>{{timeLyric}}</p>
                  </div>
                  <div class="previous" @click="previous()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><title>previous</title><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </div>
                  <div class="play">
                    <div class="playing" @click="cplay()" v-show="!bool">
                      <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <title>background</title>
                            <rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
                          </g>
                          <g>
                            <title>play</title>
                            <rect id="svg_3" height="23.269886" width="23.529401" y="12.671068" x="13.662634" stroke-width="1.5" stroke="#000" fill="#fff"/>
                            <path id="svg_1" fill="none" d="m0,0l48,0l0,48l-48,0l0,-48z"/>
                            <path fill="#e82359" stroke-width="0" id="svg_2" d="m24,3.910474c-11.05,0 -20,8.95 -20,20s8.95,20 20,20s20,-8.95 20,-20s-8.95,-20 -20,-20zm-4,29l0,-18l12,9l-12,9z"/>
                          </g>
                      </svg>
                    </div>
                    <div class="pause" @click="cpause()" v-show="bool">
                      <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <title>background</title>
                          <rect fill="none" id="canvas_background" height="50" width="50" y="-1" x="-1"/>
                        </g>
                        <g>
                          <title>pause</title>
                          <rect stroke="null" id="svg_3" height="19.111119" width="15.83829" y="14.652042" x="14.584344" stroke-opacity="null" stroke-width="null" fill="#ffffff"/>
                          <path id="svg_1" fill="none" d="m11.485154,12.376245l24,0l0,24l-24,0l0,-24z"/>
                          <path stroke="null" fill="#e82359" id="svg_2" d="m23.685191,4.244067c-10.930696,0 -19.801985,8.915646 -19.801985,19.900995s8.871289,19.900995 19.801985,19.900995s19.801985,-8.915646 19.801985,-19.900995s-8.871289,-19.900995 -19.801985,-19.900995zm-1.980199,27.861394l-3.960397,0l0,-15.920796l3.960397,0l0,15.920796zm7.920794,0l-3.960397,0l0,-15.920796l3.960397,0l0,15.920796z"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div class="next" @click="next()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><title>next</title><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                  </div>
                </div>
                <div class="controlShow">
                    <div class="timeShow">
                      <p>{{currentTime}} / {{duration}}</p>
                    </div>
                    <div class="volumeControl">
                      <div class="volumeIcon">
                        <div class="volumeOn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </div>
                        <div class="volumeOff">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </div>
                      </div>
                      <div class="volumeProgress">                  
                        <div class="volumeProgressNow"></div>
                      </div>
                    </div>
                    <div class="playListIcon" @click="openPlayList()">
                        <svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px"
                          viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" fill="#fff">
                        <metadata>
                          <sfw  xmlns="&ns_sfw;">
                            <slices></slices>
                            <sliceSourceBounds  width="505" height="984" bottomLeftOrigin="true" x="0" y="-120"></sliceSourceBounds>
                          </sfw>
                        </metadata>
                        <g>
                          <g>
                            <g>
                              <path d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10
                                S17.5,2,12,2z"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <circle cx="7" cy="12" r="2"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <circle cx="12" cy="12" r="2"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <circle cx="17" cy="12" r="2"/>
                            </g>
                          </g>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="playList">
          <div class="playListTitle">
            <div class="playListName">
                 <h1>List</h1>
            </div>
            <div class="playListClose" @click="closePlayList()">
                  <p>&times;</p>
            </div>
          </div>
          <div class="playListContent">
            <div class="playListName songMenu" v-for="playlist in playlists" @click="audioplay(playlist.id,playlist.name,playlist.singer,playlist.album,playlist.albumImgUrl)">
              <img :src="playlist.albumImgUrl">
              <p>{{playlist.name||"name"}}</p>
              <p>{{playlist.singer||"singer"}}</p>
            </div>
          </div>
    </div>
    <div class="login">
      <div class="loginTxt">
                  <input type="text" placeholder="name" v-model="uname">
                  <input type="password" placeholder="password" v-model="upassword">
      </div>
      <div class="loginMsg">
        <p>{{errmsg ||""}}</p>
      </div>
      <button @click="getData()">Login</button>
    </div>
    <audio id="player" autoplay="autoplay"  @canplay="getDuration" @timeupdate="updateTime"></audio>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axiosPost from './assets/common/aixosPost.js'
  export default {
data: function () {
  return {
    duration:'00:00',
    currentTime:'00:00',
    show:false,
    count:0,
    name:'',
    singer:'',
    album:'',
    playlists:[],
    bool:false,
    num:0,
    loginshow:true,
    lyrics:'',
    lyric:'',
    timeLyric:'',
    searchWords:'',
    user:'',
    errmsg:'',
    uname:'',
    upassword:'',
    albumImgUrl:'',
    page:true,
  }
},
methods: {
        getData(){
        this.errmsg=""
        var obj={
          name:this.uname,
          pwd:this.upassword
        }
        axiosPost(this.$http,'/login',obj,res=>{
           if(res.status==200){
            this.errmsg="";
            if(res.data.type=='success'){
              alert(`${res.data.value}登陆成功`)
              this.$store.dispatch('setLoginstatus',res.data.value);
              this.$router.push({name: 'home'});
            }else if(res.data.value=='密码错误'){
              this.register()
            }else{
              this.errmsg=res.data.value;
            }
          }
        })
      },
      register(){
        this.errmsg=""
        var obj={
          name:this.uname,
          pwd:this.upassword
        }
        axiosPost(this.$http,'/register',obj,res=>{
           if(res.status==200){
            if(res.data.type=='success'){
              alert(`注册成功`)
              this.$store.dispatch('setLoginstatus',res.data.value)
              this.$router.push({name: 'home'})
            }else{
              this.errmsg=res.data.value
            }
           } 
         })
    },
  hiddenLyricPage(){
    this.page=true;
    var lyricsPage = document.querySelector('.lyricsPage');
    lyricsPage.style.height =0;
  },
  showLyricPage(){
    this.page=false;
    var lyricsPage = document.querySelector('.lyricsPage');
    lyricsPage.style.height = 100+"%" ;
  },
loginAnimation(){
    var login = document.querySelector('.login');
    login.classList.toggle("loginAnimation");
  },
  openPlayList(){
    var playList = document.querySelector('.playList');
     playList.classList.toggle("show");
  },
  closePlayList(){
    var playList = document.querySelector('.playList');
    playList.classList.toggle("show");
  },
  search(words){
      this.$router.push({
          name: 'search',
          params: {
            words: words
          }
        })
        this.$store.state.searchWords=words;
  },
    toggleMenu(){
      var menu = document.querySelector('.menu');
      var playlistpage = document.querySelector('.playlistpage');
      menu.classList.toggle('change');
      playlistpage.classList.toggle('change');
    },
    cplay(){
    if(this.$store.getters.getSongId==''){
      alert('还没有点击歌曲哦') 
    }else{
          var audio = document.getElementById('player');
          if(this.bool==false){
                this.bool=!this.bool;
          }    
          audio.play();
    }

  },
  cpause(){
        var audio = document.getElementById('player');
        if(this.bool==true){
              this.bool=!this.bool;
        }
        audio.pause();
            // console.log('停止播放')
  },
  audioplay(id,name,singer,album,albumImgUrl){
      var audio = document.getElementById('player');
      var songId= id || this.$store.getters.getSongId;
      this.name = name || "";
      this.singer = singer || "";
      this.albumName = album || "";
      this.bool=true;
      this.show=true;

      if(this.$store.state.albumImgUrl.indexOf('https')==-1)
      this.$store.state.albumImgUrl = this.$store.state.albumImgUrl.replace('http','https');

      this.albumImgUrl=albumImgUrl || this.$store.state.albumImgUrl;
      this.getLyrics(songId);
      this.$http.get(`https://music.api.umcoder.com/song/url?id=${songId}`)
      .then(res=>{
             audio.src = res.data.data[0].url.replace('http','https');
      })
      // this.cplay()
  },
      getDuration(e) {
      //  console.log(e.target.duration); //此时可以获取到duration
       this.duration = this.timeToStr(e.target.duration.toFixed(0));
    },

    updateTime(e) {
       this.currentTime =this.timeToStr(e.target.currentTime.toFixed(0));  //获取audio当前播放时间
      this.changeProgress(e.target.currentTime.toFixed(0),e.target.duration.toFixed(0));
      this.audioSatus();
      for (var i = 0; i < this.lyric.length; i++) {
        var p=document.querySelectorAll('.lyricsContent p');
        if (e.target.currentTime /*当前播放的时间*/ > this.lyric[i][0]) {
            //显示到页面
            this.timeLyric = this.lyric[i][1];
            p[i].style.color="#86b0ed";
            // console.log(this.timeLyric)
        };
      };
    },
    changeProgress(cur,dur){
      
            var cprogress= document.querySelectorAll('.currentProgress');
                cprogress[0].style.width = cur/dur*100+"%";
                cprogress[1].style.width = cur/dur*100+"%";
            // console.log(cur,dur)
            
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
                     var cprogress= document.querySelectorAll('.currentProgress');
                     cprogress[0].style.width =0;
                     cprogress[1].style.width =0;
                     this.next();
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
      },
      previous(){
        if(this.num==0){
            this.num  = this.playlists.length-1;
          }
       else if(this.num>0){
         if(this.num==this.playlists.length){
           --this.num;
         }
          --this.num;
        }
            this.name = this.playlists[this.num].name;
            this.singer = this.playlists[this.num].singer;
            this.album = this.playlists[this.num].album;
            this.albumImgUrl=this.playlists[this.num].albumImgUrl;
            this.audioplay(this.playlists[this.num].id,this.name,this.singer,'',this.albumImgUrl) 

      },
      next(){
        if(this.$store.state.albumImgUrl.indexOf('https')==-1)
        this.$store.state.albumImgUrl = this.$store.state.albumImgUrl.replace('http','https');
        if(this.num==this.playlists.length-1){  
            this.num=0;
        }else{  
            ++this.num;        
        }
            this.name = this.playlists[this.num].name;
            this.singer = this.playlists[this.num].singer;
            this.album = this.playlists[this.num].album;
            this.albumImgUrl=this.playlists[this.num].albumImgUrl;
            this.audioplay(this.playlists[this.num].id,this.name,this.singer,'',this.albumImgUrl)         
      },
    getLyrics(id){
            var Lid = id || this.$store.state.id;
            this.$http.get(`https://music.api.umcoder.com/lyric?id=${id}`)
            .then(res=>{
                // console.log(res);
                // console.log(res.data)
                if(res.data.lrc!=null){
                  this.lyrics=res.data.lrc.lyric;
                  this.parseLyric(this.lyrics);
                }
                else{
                  this.timeLyric='sorry,the lyrics is null';
                  return;
                } 
            })
            .catch(err=>{
                console.log(err)
            })
      },
      parseLyric(text) {
        // console.log(text)
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\d{0}]|\[\d{2}:\d{2}.\d{2}\d{1}]/g,

        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    // while (!pattern.test(lines[0])) {
    //     lines = lines.slice(1);
    // };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        if(time!==null){
                  time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
        }
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    this.lyric=result;
  }
},
beforeMount () {
  console.log(`^_^^_^^_^^_^^_^`)
      console.info('    已更新的功能')        
      console.info('    播放功能')
      console.info('    历史表单')     
      console.info('    搜索功能')      
      console.info('    播放当前歌曲名')   
      console.info('    播放进度条')  
      console.info('    点击正在播放歌曲的专辑图片即可看到歌词页面，暂不支持滚动')    
      console.info('    登录功能目前只能登录，还没有自己的歌单列表，会后续开发')
      console.info('    目前加载可能较慢，加载页面后续会优化')
      console.info(`ctrl+↑ || ctrl+↓ 控制音量加减`)
      console.info(`    音量控制尽快做出来`)
  console.log(`^_^^_^^_^^_^^_^`)

},

watch:{   
          getSongId(curval,oldval){ 
            if(this.$store.state.albumImgUrl.indexOf('https')==-1)
            this.$store.state.albumImgUrl = this.$store.state.albumImgUrl.replace('http','https');
            this.$store.state.historylists.push({id:`${this.$store.state.id}`,name:`${this.$store.state.songName}`,singer:`${this.$store.state.singer}`,album:`${this.$store.state.albumName}`,albumImgUrl:`${this.$store.state.albumImgUrl}`})
            this.count++;
            this.changeProgress()
            this.audioplay();
            this.name=this.$store.state.songName;
            this.singer=this.$store.state.singer;
            this.album=this.$store.state.albumName;
            this.albumImgUrl=this.$store.state.albumImgUrl;
            this.playlists=this.$store.state.historylists;
          },
           getPlaylistTitle(curval,oldval){ 
             this.name = curval;
            // this.historylists[this.count].push([{name:oldval}])
            // console.log(`新歌名${curval}--旧歌名${oldval}`);
          }, 
          getLoginstatus(curval,oldval){
            this.user=this.$store.state.loginstatus;
            // localStorage.setItem(this.user,this.playlists);
            // console.log(localStorage.getItem(this.user));
          }

},
computed:{    
            ...mapGetters([
              'getSongId',
              'getPlaylistTitle',
              'getLoginstatus'
            ])  
}
  }
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
a{
    color:#fff;
}
img{
  height:100%;
  width:100%;
}
nav{
  position: fixed;
  height:10%;
  width:100%;
  background:rgb(30,52,76);
  box-shadow: 0px 2px 3px #000;
  z-index:1;
}

nav .content{
  margin:0 10px;
  display: flex;
  flex-direction: row;
  vertical-align: center;
  align-items: center;
  padding:5px 15px;
}
nav .content .content-icon{
  height:25px;
  width:25px;
  cursor: pointer;
}
nav .content .content-logo{
    margin-left:45px;
    height:40px;
    width:40px;
}
.menu{
  position: fixed;
  height:100%;
  width:14%;
  left:0;
  transition:0.4s;
  background: rgb(30,52,76);
}
.playlistpage{
  position: absolute;
  height:100%;
  width:80%;
  top:13%;
  left:18%;
  transition:0.4s;
}
.playlistpage.change{
    left:5%;
}
.menu.change{
  left:-14%;
}
.content .content-search{
      display: flex;
      flex-direction: row;
      vertical-align: center;
      align-items: center;
      height:48px;
      width:480px;
      margin:5px 170px;
      background:rgb(66,85,105); 
}
.content .content-search .search-icon{
  position:absolute;
  padding:10px;
  height:24px;
  width:24px;
}
.content .content-search .mInputText{
    height:100%;
    width:100%;
}
.content .content-search .mInputText input{
  height:80%;
  width:85%;
  margin:4px auto;
  background:rgb(66,85,105);
  border:none;
  outline: none;
  font-size:18px;
  text-indent:10px;
  color:#fff;
}
.content .content-search .mInputText input::placeholder{
   color:rgb(173, 162, 162);
}

.content .content-login{
    position:absolute;
    right:10%;
    height:36px;
    width:88px;
}
.content .content-login button{
    height:100%;
    width:100%;
    color:#fff;
    background:rgb(218,15,71);
    border:none;
    box-shadow:0px 1px 2px black;
    outline:none;
    cursor:pointer;
}
.content .content-login button:hover{
    background:rgb(223, 39, 91);
}
.menu ul{
  position:absolute;
  top:11%;
  height:100%;
  width:100%;
  overflow:hidden;
}
.menu ul li{
  transition:0.2s;
  display: flex;
  flex-direction: row;
  vertical-align:center;
  align-items: center;
  padding:12px 20px;
}
.menu ul li .menu-content{
  padding-left:30px;
  color:#fff;
}

.menu ul li:hover{
  background:rgb(48,68,90);
}
.menu .menu-icon{
  height:24px;
  width:24px;
}
.player-bar{
  position:fixed;
  bottom:0;
  height:96px;
  width:100%;
  display: flex;
  flex-direction: row;
  vertical-align:center;
  align-items: center;
}
.player-bar .player-songImg{
  height:96px;
  width:96px;
  cursor: pointer;
}
.player-bar .player-control{
  height:96px;
  width:100%;
  background:rgb(17,58,93);
}
.player-bar .player-control .playerControl-progress{
  height:3px;
  width:100%;
  background:rgb(54,75,100);
}
.player-bar .player-control .playerControl-progress .currentProgress{
  height:100%;
  width:0;
  background:rgb(218,15,71);
}
.player-bar .player-control .playerControl-content{
  height:100%;
  width:100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  vertical-align:center;
  align-items: center;
  overflow: hidden;
}
.player-bar .player-control .playerControl-content .songContent{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  vertical-align:center;
  align-items: left;
  text-align:left;
  overflow: hidden;
  margin:0 20px;
  height:100%;
  width:auto;
}


.player-bar .player-control .playerControl-content .controlContent,
.player-bar .player-control .playerControl-content .controlShow,
.player-bar .player-control .playerControl-content .volumeControl
{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  vertical-align:middle;
  align-items: center;
  overflow: hidden;
  /* padding-left:200px; */
  height:100%;
  width:auto;
}
 
.player-bar .player-control .playerControl-content .songContent .songName,
.player-bar .player-control .playerControl-content .songContent .singer,
.player-bar .player-control .playerControl-content .songContent .songDetalis{
  margin-top:10px;
}
.player-bar .player-control .playerControl-content .controlContent .previous,
.player-bar .player-control .playerControl-content .controlContent .play,
.player-bar .player-control .playerControl-content .controlContent .next{
  display: flex;
  flex-wrap: nowrap;
  vertical-align:middle;
  align-items: center;
  /* overflow: hidden; */
  height:48px;
  width:48px;
  cursor: pointer;
}
.player-bar .player-control .playerControl-content .controlContent .play svg{
  background:#e82359;
  border-radius: 100%;
  box-shadow: rgb(244, 91, 133) 0px 0px 15px;
}
.player-bar .player-control .playerControl-content .controlShow .timeShow,
.player-bar .player-control .playerControl-content .controlShow .volumeControl{
  width:40%;
}
/* .player-bar .player-control .playerControl-content .controlContent .play .pause, */
.player-bar .player-control .playerControl-content .controlShow .volumeOff{
  /* position: absolute; */
    display: none;
}
.player-bar .player-control .playerControl-content .controlContent .next{
    flex-direction:row-reverse;
}
.player-bar .player-control .playerControl-content .controlContent .controlShow .volumeControl{
    height:100%;
    width:100%;
    flex-direction: column;
}
.player-bar .player-control .volumeProgress{
    height:3px;
    width:110px;
    background:rgb(4,31,53);
}
.player-bar .player-control .volumeProgress .volumeProgressNow{
  height:100%;
  width:10%;
  background:#fff;
}


.player-bar .player-control .playerControl-content .songContent{
  width:15%;
  flex-shrink: 1;

}
.player-bar .player-control .playerControl-content .controlContent{

  width:55%;
  flex-shrink: 2;

}
.player-bar .player-control .playerControl-content .controlShow{
  width:30%;
  flex-shrink: 1;
}
.player-bar .player-control .playerControl-content .controlShow .timeShow{
  padding-right:15px;
}
.player-bar .player-control .playerControl-content .controlShow .volumeControl .volumeIcon{
  margin-right:10px;
}
.player-bar .player-control .playerControl-content .controlShow .volumeControl .volumeProgress{
  height:4px;
  margin-right:8px;
}
.player-bar .player-control .playerControl-content .controlShow .volumeIcon,
.player-bar .player-control .playerControl-content .controlShow .volumeProgress, 
.player-bar .player-control .playerControl-content .controlShow .playListIcon{
  cursor: pointer;
}


.playList{
  position: fixed;
  height:70%;
  top:15%;
  right:-22%;
  width:20%;
  background:rgb(30,52,76);
  overflow-X:auto;
  transition:0.4s;
}
.show{
  right:10px;
}
.playList .playListTitle h1{
    /* position: absolute; */
    text-align: left;
    margin:10px;
}
.playList .playListTitle .playListClose{
  position: absolute;
  top:0;
  right:6px;
  font-size: 50px;
  cursor: pointer;
}
.lyric{
  width:40%;
  text-align: left;
  margin-right:20px;
}
.playList .playListName{
  position: relative;
  margin:auto;
  padding:10px;
  display:flex;
  flex-direction: row;
  transition: 0.4s;
}
.playList .songMenu:hover{
  background:rgb(4,31,53);
  cursor: pointer;
}
.playList .songMenu img{
  width:40px;
}
.playList .songMenu p{
  text-align: left;
  width:50%;
  margin:5px;
}
.login{
 position: fixed;
  height:0;
  top:10%;;
  right:40px;
  width:20%;
  background:rgb(30,52,76);
  overflow:hidden;
  transition:0.4s;
}
.login input{
  height:20px;
  margin:10px auto 5px;
  text-indent: 8px;
}
.loginAnimation{
  height:20%;
}
.login button{
    margin-top:10px;
    height: 30px;
    width: 160px;
    color: #fff;
    background: rgb(218,15,71);
    border: none;
    -webkit-box-shadow: 0px 1px 2px black;
    box-shadow: 0px 1px 2px black;
    outline: none;
    cursor: pointer;
}
.loginMsg p{
  font-size:10px;
}

.lyricsPage{
  position: absolute;
  height:0;
  width:100%;
  background:rgb(15,58,93);
  z-index:2;
  bottom:0;
  overflow: hidden;
  transition: 0.6s;
}
.closeItem{
  position:absolute;
  height:40px;
  width:40px;
  top:10px;
  left:10px;
  font-size: 40px;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 50%;
}
.closeItem p{
  line-height: 40px;
  margin:auto;
}
.closeItem:hover{
  background: #b6c5d9;
}
.lyricsPage{
  overflow-y: auto;
}
.lyricsPage .lyricContent{
  display: flex;
  flex-direction: row;
}
.lyricsPage .leftContent,
.lyricsPage .rightContent{
  height:100%;
  width:50%;
}
.lyricsPage .leftContent{
 padding:100px 0 0 0;
}
.lyricsPage .rightContent{
  padding:60px 0 0 0;
}
.lyricsPage .leftContent .topBox {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  align-items: center;
}
.lyricsPage .leftContent .topBox p{
  margin-top:10px;
  font-size:20px;
}
.lyricsPage .leftContent .topBox .imgBox{
  height:350px;
  width:350px;
  margin:auto;
}
.lyricsPage .leftContent .topBox .imgBox img{
  box-shadow: 0.2rem 0.2rem 1rem #fff;
}
.lyricsPage .playerControl-progress{
  height:3px;
  width:60%;
  margin:40px 0 0 0;
  background:rgb(54,75,100);
}
.lyricsPage .playerControl-progress .currentProgress{
  height:100%;
  width:0;
  background:rgb(218,15,71);
}
.lyricsPage  .timeShow{
  display: flex;
  width:60%;
  flex-direction: row;
  vertical-align: center;
}
.lyricsPage  .timeShow .leftTime{
  width:50%;
  text-align: left;
}
.lyricsPage  .timeShow .rightTime{
  width:50%;
  text-align: right;
}
.lyricsPage .lyricsContent{
   overflow-y:auto;
}
.lyricsPage .lyricsContent p{
  margin:6px;
}
</style>