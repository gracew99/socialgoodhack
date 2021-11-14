import React from "react";
import './App.css';
import Card from 'react-bootstrap/Card';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@material-ui/core/IconButton';
import axios from './axios';

function NewsFront(props) {
  async function addToLibrary() {
      const article = props.newsArticle;
      const url = "/user/library/123";
      const params = {
        newsArticle : {
          title: article.title ,
          urlToImage: article.urlToImage,
          description: article.description,
          author: article.author,
          source: article.source,
          url: article.url,
          score: article.score
        }        
      }
      console.log(params)
      await axios.post(url, params);
  }
  return (
    <Card style={{ width: '18rem', height: '25rem', color: "#9D5C0D" }}>
      <Card.Body style={{backgroundImage: `url("https://media.istockphoto.com/photos/brown-recycled-paper-crumpled-texture-background-cream-old-vintage-picture-id1278709873?b=1&k=20&m=1278709873&s=170667a&w=0&h=I7KaFvQN4G7p6EjkFNfKDr-9RUsNUPV8vTVhCSdG_pQ=")`}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <Card.Title style={{fontWeight: "600"}}><a style={{color: "#9D5C0D", textDecoration: "none"}} href={props.newsArticle.url}>{props.newsArticle.title}</a></Card.Title>
          <div onClick={props.handleClick}>
            <img style={{width: "80%"}} src={props.newsArticle.urlToImage} onError={(e)=>{console.log("ERROR IMAGE"); e.target.onerror = null; e.target.src="https://i1.wp.com/oxsci.org/wp-content/uploads/2019/05/SMILE.png?fit=1024%2C1024&ssl=1"}} alt="img"/>
          </div>
          <div onClick={addToLibrary} style={{position: "absolute", marginLeft: "78%", marginTop: "115%"}}>
            <IconButton>
              <AddIcon></AddIcon>
            </IconButton>
          </div>
        </div>

      </Card.Body>
    </Card>
    
  );
}

export default NewsFront;
