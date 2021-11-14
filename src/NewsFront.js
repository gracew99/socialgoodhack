import React from "react";
import './App.css';
import Card from 'react-bootstrap/Card';

function NewsFront(props) {

  return (
    <Card style={{ width: '18rem', height: '23.5rem', color: "black" }}>
      <Card.Body style={{backgroundImage: `url("https://media.istockphoto.com/photos/brown-recycled-paper-crumpled-texture-background-cream-old-vintage-picture-id1278709873?b=1&k=20&m=1278709873&s=170667a&w=0&h=I7KaFvQN4G7p6EjkFNfKDr-9RUsNUPV8vTVhCSdG_pQ=")`}}>
        <Card.Title style={{fontWeight: "600"}}>{props.newsArticle.title}</Card.Title>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} onClick={props.handleClick}>
        <img style={{width: "90%"}} src={props.newsArticle.urlToImage} onError={(e)=>{console.log("ERROR IMAGE"); e.target.onerror = null; e.target.src="https://i1.wp.com/oxsci.org/wp-content/uploads/2019/05/SMILE.png?fit=1024%2C1024&ssl=1"}} alt="img"/>
        </div>
      </Card.Body>
    </Card>
    
  );
}

export default NewsFront;
