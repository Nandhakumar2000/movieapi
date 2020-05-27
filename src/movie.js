import React, { Component } from 'react';
import'./movie.css';
class Movie extends Component{
    constructor(){
       super();
       this.state = {
           data: {results: []},
           searcharray: []
       }
       this.getMoviesFromApi = this.getMoviesFromApi;
       this.getMoviesFromApi();
       this.handleChange = this.handleChange.bind(this);
    }

   

 
  
     getMoviesFromApi()  {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=d272326e467344029e68e3c4ff0b4059&language=en-US&query=spiderman')
        .then(response => response.json())
        .then((jsonData) => {
          console.log(jsonData.results);
         this.state.data = jsonData;
          for(var i=0; i< jsonData.results.length ; i++){
           this.state.searcharray[i] = jsonData.results[i].title;
          }
          this.setState({
         
          });
        })
        .catch((error) => {
          // handle your errors here
          console.error(error)
        })
    }
   
    handleChange(e) {
      console.log(e.target.value); 
      for(var i=0; i< this.state.searcharray.length ; i++){
        let searchBarText = e.target.value;
        if (this.state.searcharray[i].includes(searchBarText)) {
          document.getElementById(this.state.searcharray[i]).style.display = 'block';
          console.log(this.state.searcharray[i]);
        } else {
          document.getElementById(this.state.searcharray[i]).style.display = 'none';
        }
      }
    
  }

    render(){
      
  
        return (
           <div>
          <form class="example" id="myform"  >
           <input type="text" className="input" onChange={this.handleChange} placeholder="Search for movies..." />
              </form>  
         {
        this.state.data.results.map((item,i) => {
         var poster = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
         var bg_img = "https://image.tmdb.org/t/p/w500/" + item.backdrop_path;
         var res ;
         if(item.adult == true){
            res = 'A';
         }
         else{
             res = 'U';
         }
        return <div  id={item.title} style={{display: 'block'}}><div class="movie_card" >
              <div class="blur_back bright_back" ><img src={bg_img}></img></div>
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src={poster}/>
        <h1 ref={item.title}>{item.title}</h1>
            <h4>{item.release_date}, Sam Raimi</h4>
            <span class="minutes">{item.vote_average} /10</span>
            <p class="type">{res}</p>
          </div>
          <div class="movie_desc">
      <p class="text">
          {item.overview}
      </p>
    </div>
    
        </div>

      </div>
</div>
         })
         
         }
        </div>
        );
    }
}
export default Movie;
