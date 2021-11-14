import React, { useEffect, useState } from "react";
import './App.css';
import Carousel from './Carousel';

function App() {
  const [news, setNews] = useState([]);
  const arr = ["news article 1", "news article 2", "news article 3", "news article 4"]
  useEffect(() => {
    fetch("/news")
    .then(response => response.json())
    .then(data => {
      setNews(data)
      console.log(data)
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {/* Today's Positive News Feed */}
        
      {/* {news.map(article => <p>ARTICLE: {article}</p>)} */}
      <Carousel></Carousel>
      </header>
    </div>
  );
}

export default App;
