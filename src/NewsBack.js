import React from "react";
import './App.css';

function NewsFront(props) {

  return (
    <div style={{fontSize: "0.5em"}} onClick={props.handleClick}>
        <p>{props.newsArticle.description.substring(0, 500)}</p>
    </div>
  );
}

export default NewsFront;
