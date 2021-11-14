import React from "react";
import './App.css';

function NewsFront(props) {

  return (
    <div onClick={props.handleClick}>
        <img style={{width: "70%"}} src={props.newsArticle.urlToImage} alt="img"/>
        <div style={{lineHeight: "1.5", fontSize: "0.7em"}}>
        <p>{props.newsArticle.title}</p>
        </div>
        <div style={{lineHeight: "0.7", fontSize: "0.5em"}}>
        <p>By: {props.newsArticle.author}</p>
        <p>Source: {props.newsArticle.source}</p>
        </div>
    </div>
  );
}

export default NewsFront;
