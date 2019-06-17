<template>
  <div class="searchBox">
    <div class="artists">
      <h2>Artists</h2>
      <div class="content">
        <div class="artist">
          <img :src="artUrl" alt>
        </div>
      </div>
    </div>
    <div class="songs">
      <h2>Songs</h2>
      <div class="content" v-for="song in songs">
        <div
          class="contentImg"
          @click="getSongId(song.id,song.name,song.artists[0].name,song.album.name,song.album.artist.img1v1Url)"
        >
          <img :src="song.album.artist.img1v1Url" alt>
        </div>
        <div class="contentSongs">
          <div
            class="songNames"
            @click="getSongId(song.id,song.name,song.artists[0].name,song.album.name,song.album.artist.img1v1Url)"
          >
            <p>{{song.name}}</p>
          </div>
          <div class="singerNames">
            <p>{{song.artists[0].name}}</p>
          </div>
        </div>
        <div class="albumNames">
          <p>{{song.album.name}}</p>
        </div>
        <div class="songTime">
          <p>00:00</p>
        </div>
      </div>
    </div>
    <!-- <div class="albums">

    </div>-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      artists: [],
      songs: [],
      albums: [],
      artUrl: ""
    };
  },
  methods: {
    getSongId(id, name, singer, album, albumImgUrl) {
      this.$store.state.id = id;
      this.$store.state.songName = name;
      this.$store.state.singer = singer;
      this.$store.state.albumName = album;
      this.$store.state.albumImgUrl = albumImgUrl;
    },
    search(words) {
      var q = words || this.$router.currentRoute.params.words;
      var axios = this.$http;
      var axiosCreate = axios.create({
        baseURL: "https://music.api.umcoder.com",
        timeout: 5000
      });
      axiosCreate.interceptors.request.use(
        config => {
          //在发送请求之前做某事，比如说 设置loading动画显示
          //   this.select('.loading').style.display = 'block'
          return config;
        },
        error => {
          //请求错误时做些事
          return Promise.reject(error);
        }
      );

      //添加响应拦截器
      axiosCreate.interceptors.response.use(
        response => {
          //对响应数据做些事，比如说把loading动画关掉
          //   setTimeout(()=>{
          //       this.select('.loading').style.display = 'none'
          //   },500)
          return response;
        },
        error => {
          //请求错误时做些事
          return Promise.reject(error);
        }
      );
      axiosCreate
        .get(`/search?keywords=${q}&limit=40`)
        .then(res => {
          if (res.status == 200) {
            // console.log(res)
            this.songs = res.data.result.songs;
            this.artists = res.data.result.songs;
            this.albums = res.data.result.songs;
            this.artUrl = res.data.result.songs[0].album.artist.img1v1Url;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(ele) {
      return document.querySelector(ele);
    },
    rplay(id, name) {
      this.$store.dispatch("setSongId", id);
      this.$store.dispatch("setPlaylistTitle", name);
    }
  },
  watch: {
    getSearchWords(curval, oldval) {
      // console.log(curval,oldval)
      if (!curval) this.search(oldval);
      else this.search(curval);
    }
  },
  computed: {
    ...mapGetters(["getSearchWords"])
  },
  beforeMount() {
    this.search(this.$store.state.searchWords);
  }
};
</script>
<style scoped>
img {
  height: 100%;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 4px 4px 5px black;
  cursor: pointer;
}
h2 {
  text-align: left;
}
.searchBox {
  display: flex;
  flex-direction: column;
  vertical-align: center;
  align-items: center;
  margin-bottom: 50%;
  width: 100%;
  height: 100%;
}
.artists {
  height: 40%;
  width: 100%;
  margin: 10px 10px 10px 30px;
  display: flex;
  flex-direction: column;
  vertical-align: center;
}
.songs {
  height: 60%;
  width: 100%;
  margin: 10px 10px 10px 30px;
  display: flex;
  flex-direction: column;
  vertical-align: center;
}
.albums {
  height: 100%;
  width: 100%;
  margin: 10px 10px 10px 30px;
  display: flex;
  flex-direction: column;
  vertical-align: center;
}
.contentImg {
  height: 100%;
  width: 20px;
}
.content {
  height: 100%;
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: row;
  vertical-align: center;
}
.artists {
  width: 100%;
  /* padding:40px; */
}
.artists img {
  height: 250px;
  width: 250px;
}
.artists .artist {
  padding: 10px 0px 0px 0px;
}
.songs {
  display: flex;
  flex-direction: column;
}
.songs .content {
  flex-direction: row;
  text-indent: 0px;
  transition: 0.2s;
  line-height: 22px;
  border-bottom: 1px solid #ffffff0a;
  padding: 5px 0;
}
.songs .content .contentSongs,
.songs .content .albumNames,
.songs .content .songTime {
  display: flex;
  vertical-align: center;
  align-items: center;
  width: 45%;
  margin: auto;
  margin: 10px;
  overflow: hidden;
  text-align: left;
}
.songs .content .contentSongs .songNames {
  width: 70%;
}
.songs .content .songTime {
  width: 20%;
}
.songs .content .contentImg {
  height: 50px;
  width: 80px;
}
.contentImg {
  margin-right: 20px;
}
.contentImg img {
  border-radius: 1px;
  box-shadow: 1px 1px 5px black;
}
.songs .content:hover {
  background: rgb(30, 52, 76);
}
.songs .content p {
  cursor: pointer;
}
.albumNames {
  /* margin-right:100px; */
  width: 200px;
}
.songs .content .contentSongs .albumNames {
  margin: auto;
}
@media screen and (max-width: 767px) {
  .songs .content .contentSongs {
    flex-direction: column;
  }
  .songs .content .contentImg,
  .songs .content .songTime,
  .songs .content .albumNames {
    display: none;
  }
  .songs .content .contentSongs {
    width: 100%;
  }
  .songs .content .contentSongs .songNames {
    text-align: left;
    width: 100%;
    color: #fff;
  }
  .songs .content .contentSongs .singerNames {
    text-align: left;
    width: 100%;
    letter-spacing: 2px;
    color: #ffffff7a;
  }
}
</style>



