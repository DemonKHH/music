<template>
   <div class="searchBox">
    <div class="searchBar">
       <div class="search" >
           <input type='search' id="search" placeholder="search" v-model="q" @keyup.enter="search"/>
       </div>
    </div>
    <div class="searchResult">
<section v-show="searchResult">
  <!--for demo wrap-->
  <h1>搜索结果</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
              <thead>
                      <tr>
                            <th>歌名</th>
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
                    <td>{{result.singer}}</td>
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
            this.$http.get(`https://api.itooi.cn/music/netease/search?key=579621905&s=${this.q}&type=song&limit=100&offset=0`)
            .then(res=>{
            if(res.status== 200){
              this.results=[];
              this.searchResult=true;
            for(var i=0;i<res.data.data.length;i++){
              this.results.push({
                name:res.data.data[i].name,
                id:res.data.data[i].id,
                singer:res.data.data[i].singer,
                })
              }
            // this.autoTable();
            }
        }).catch(err=>{
              console.log(err)
            })
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
  font-size: 12px;
  color: #000;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #000;
  border-bottom: solid 1px rgba(255,255,255,0.1);
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



