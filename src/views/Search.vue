<template>
   <div class="searchBox">
    <div class="searchBar">
       <div class="search" >
           <input type='search' id="search" placeholder="search" v-model="q" @keyup.enter="search"/>
       </div>
    </div>
    <div class="searchResult">
<div class="loading">
      <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#86b0ed">
          <g transform="matrix(1 0 0 -1 0 80)">
              <rect width="10" height="20" rx="3">
                  <animate attributeName="height"
                      begin="0s" dur="4.3s"
                      values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
                      repeatCount="indefinite" />
              </rect>
              <rect x="15" width="10" height="80" rx="3">
                  <animate attributeName="height"
                      begin="0s" dur="2s"
                      values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"
                      repeatCount="indefinite" />
              </rect>
              <rect x="30" width="10" height="50" rx="3">
                  <animate attributeName="height"
                      begin="0s" dur="1.4s"
                      values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"
                      repeatCount="indefinite" />
              </rect>
              <rect x="45" width="10" height="30" rx="3">
                  <animate attributeName="height"
                      begin="0s" dur="2s"
                      values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
                      repeatCount="indefinite" />
              </rect>
          </g>
        </svg>
</div>
<section v-show="searchResult">
  <!--for demo wrap-->
  <h1>搜索结果</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
              <thead>
                      <tr>
                            <th>歌名</th>
                            <th></th>
                            <th>歌手</th>
                      </tr>
              </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
            <tr v-for="result in results">
                    <td @click="rplay(result.id,result.name)">{{result.name}}</td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><title id="addIconTitle">添加到播放列表</title><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><title id="addIconTitle">添加到收藏</title><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><title id="addIconTitle">分享</title><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><title id="addIconTitle">下载</title><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </td>
                    <td>{{result.artists[0].name}}</td>
            </tr>
      </tbody>
    </table>
  </div>
</section>

    </div>
   </div>
</template>
<script>
export default{
data(){
        return {
            q:'',
            searchResult:false,
            results:[]
        }
    },
methods:{
search(){
  var axios = this.$http
  var axiosCreate =  axios.create({
      baseURL :'http://music.api.umcoder.com',
      timeout:5000
  })
  axiosCreate.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
  this.select('.loading').style.display = 'block'
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})

//添加响应拦截器
axiosCreate.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
  setTimeout(()=>{
      this.select('.loading').style.display = 'none'
  },500)
  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
})
axiosCreate.get(`/search?keywords=${this.q}`)
            .then(res=>{
            if(res.status== 200){
              console.log(res)
              this.results=[];
              this.searchResult=true;
              this.results=res.data.result.songs
            // for(var i=0;i<res.data.data.length;i++){
            //   this.results.push({
            //     name:res.data.data[i].name,
            //     id:res.data.data[i].id,
            //     singer:res.data.data[i].singer,
            //     })
            //   
            }
        }).catch(err=>{
              console.log(err)
            })
},
    select(ele){
      return document.querySelector(ele)
    },
    rplay(id,name){
        this.$store.dispatch('setSongId',id)
        this.$store.dispatch('setPlaylistTitle',name)
    },
    
    // autoTable() {
    //     var table=document.createElement('table');
    //     var thead=document.createElement('thead');
    //     var tbody=document.createElement('tbody');
    //     var name = document.createElement('tr');
    //     var singer = document.createElement('tr');
    //     var searchResult=document.getElementsByClassName('searchResult')[0];
    //     var tr = document.createElement('tr');
    //     tr.setAttribute("v-for","result in results")
    //     //添加属性
    //     table.setAttribute('height',40+"px")
    //     table.setAttribute('cellspacing',0+"px")
    //     var name1 = document.createElement('td');
    //     var singer1 = document.createElement('td');
    //     name1.innerHTML="{{result.name}}";
    //     singer1.innerHTML="{{result.name}}";
    //     tr.appendChild(name1)
    //     tr.appendChild(singer1)
    //     tbody.appendChild(tr)
    //     thead.appendChild(name)
    //     thead.appendChild(singer)
    //     table.appendChild(thead)
    //     table.appendChild(tbody)
    //     searchResult.appendChild(table)
    // }

    }

}

</script>
<style scoped>
.searchBox{
    position: absolute;
    left:15%;
    height:100%;
    width:85%;
}
.searchBar{
    position: fixed;
    height:10%;
    width:85%;
    box-sizing: border-box;
    border-radius: 5px;
    background-color:rgb(232,240, 254);
    z-index:1;
}
.searchBar .search{
    height:90%;
    width:96%;
    margin:auto;
    padding:8px;
}
#search{
    height:80%;
    width:100%;
    font-size: 30px;
    line-height: 60px;
    border:none;
    outline:none;
    background-color:rgb(232, 240, 254)
}
.searchResult{
    position: absolute;
    top:10%;
    width:100%;
    height:90%;
}
table tbody tr td{
    cursor: pointer;
}




h1{
  font-size: 30px;
  color: #000;
  text-transform: uppercase;
  font-weight: 300;
  text-align: left;
  margin-bottom: 15px;
}
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
.tbl-content{
  height:500px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  color: #000;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 14px;
  color: #000;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}
td svg{
  margin-left:8px
}

/* demo styles */


body{
  font-family: 'Roboto', sans-serif;
}
section{
  /* background: linear-gradient(to right, #bdccc6, #bdd2d4); */
  margin: 50px;
}


/* follow me template */
.made-with-love {
  margin-top: 40px;
  padding: 10px;
  clear: left;
  text-align: center;
  font-size: 10px;
  font-family: arial;
  color: #000;
}
.made-with-love i {
  font-style: normal;
  color: #F50057;
  font-size: 14px;
  position: relative;
  top: 2px;
}
.made-with-love a {
  color: #000;
  text-decoration: none;
}
.made-with-love a:hover {
  text-decoration: underline;
}





/*loading*/

  .loading{
    display: none;
    height:100%;
    width:100%;
  }
  .loading svg{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color:rgb(134,176,237);
  }
/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
    width: 6px;
} 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
</style>



