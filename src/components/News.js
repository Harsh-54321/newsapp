import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
   
    constructor() {
        super();
        console.log("hello i am a constructor from news componant.");   
        this.state = {
            articles: this.articles, 
            loading : false,
            page: 1
        }
    }

    async componentDidMount() {
        console.log("cdm");
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bb58797befc64ff7bb0089816a0c95a8&page=1";
        let data = await fetch(url);
        let parsedData = await data.json()  
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totleArticles: parsedData.totleResultes})
    }

    hendlePrevClick = async () => {
      console.log("this is click of prev click...");
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bb58797befc64ff7bb0089816a0c95a8&page=${this.state.page - 1 }&pagesize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()  
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1
      })
    }

    hendleNextClick = async () => {
      if(this.state.page+1 > Math.ceil(this.state.totleArticles/20)) {
        
      } else
      {
        console.log("this is click of Next click...");
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bb58797befc64ff7bb0089816a0c95a8&page=${this.state.page + 1 }&pagesize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()  
        console.log(parsedData);
        this.setState({
          articles: parsedData.articles,
          page: this.state.page + 1
        })}
    }

  render() {
    console.log("render" )
    return (
      <div className ="container my-3">
        <h1>News - app</h1>
      
          <div className="row">
          {this.state.articles && this.state.articles.map((element) => {
              return  <div className="col-md-4" key={element.url}>
                  <NewsItem key ={element.url} title={element.title ? element.title.slice(0,45) : "" } description={element.description ? element.description.slice(0,88): ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.moneycontrol.com/static-mcnews/2023/06/WhatsApp-Image-2023-06-05-at-5.44.33-PM-1-2-770x433.jpeg"}  newsUrl={element.url}/>
              </div>  
          })}
                 
          </div>
          <div className="container d-flex justify-content-between align-items-center mt-5">
            <button type="button" disabled= {this.state.page <=1} className="btn btn-dark" onClick={this.hendlePrevClick} >&larr; PERV</button> 
            <button type="button" className="btn btn-dark" onClick={this.hendleNextClick}>NEXT &rarr;</button>
          </div>
      </div>
    )
  }
}
