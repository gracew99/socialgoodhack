import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import TextPad from './TextPad';
import React, {useState, useEffect} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import axios from './axios';
import { Container, Row, Col } from 'react-grid-system';
import NewsFront from './NewsFront';
import NewsBack from './NewsBack';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function Carousel() {
    
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );
 
    function logLength() {
      console.log(newsArticles.length)
      console.log(newsArticles)
    }
    function handleClick1(article) {
      MySwal.fire({
        title: <p>Hello World</p>,
        footer: 'Copyright 2018',
        didOpen: () => {
          // `MySwal` is a subclass of `Swal`
          //   with all the same instance & static methods
          MySwal.clickConfirm()
        }
      }).then(() => {
        return MySwal.fire(<NewsBack newsArticle={article}></NewsBack>)
      })
      
      // setIsFlipped1(prevState => (!prevState));
    }
    // const newsArticles = [
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   },
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   },
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   },
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   },
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   },
    //   {
    //     urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
    //     title: "TITLE",
    //     author: "author",
    //     description: "description",
    //     source: "source"
    //   }
    // ]
    const [newsArticles, setNewsArticles] = useState([])
      const params = {
          journal: editorState.getCurrentContent().getPlainText('\u0001')
      }
      async function onClick(e) {
          if (e.currentIndex === 0){
            const url = "/user/journals/123";

            await axios.post(url, params).then(async (result) => {
              const url1 = "/user/keywords/123"
              await axios.get(url1).then((keywords) => {
                console.log(keywords.data)
                const keywordSet = new Set(keywords.data)
                const keywordData = Array.from(keywordSet)
                keywordData.forEach(keyword => {
                  if (keyword === '') {
                    return;
                  }
                  console.log("now querying for ")
                  console.log(keyword)
                  axios.get('https://newsapi.org/v2/everything?q=' + keyword + '&from=2021-11-13&pageSize=100&apiKey=' + process.env.REACT_APP_NEWSAPIKEY)
                  .then((response) => {
                    // console.log(keyword)
                    // console.log(response.data.articles);
                    const articles = response.data.articles;
                    console.log(articles)
                    articles.forEach(async (article) => {
                      // console.log(article.content)
                      // console.log(article.description)
                      const url1 = "/articleSentiment"
                      const params1 = {
                        description: article.description
                      }
                      await axios.post(url1, params1).then(sentiment => {
                        console.log(sentiment.data)
                        if (sentiment.data > .3) {
                          const newArticle = {
                            title: article.title,
                            urlToImage: article.urlToImage,
                            description: article.description,
                            author: article.author,
                            source: article.source.name,
                            url: article.url,
                            score: sentiment.data
                          }
                          setNewsArticles(prevState => [...prevState, newArticle])
                        }
                      });
                    })
  
                  })
                  .catch(err => console.log(err));
                })
  
              })
            });
          }
      }

    return (
      // onTransitionRequest={onClick}
      <AwesomeSlider onTransitionRequest={(e) => onClick(e)}> 
        <div style={{backgroundColor: "#282c34"}}>
          <h1>Daily Journal</h1>
          <br/>
          <div style={{ padding: "1%", borderStyle: "solid", borderColor: "white", width: "1000px", height: "400px"}}>
            <div style={{height: "100%"}}>              
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
          <br/>
          </div>          
        </div>
        <div style={{backgroundColor: "#282c34"}}> 

        </div>
        <div style={{backgroundColor: "#282c34"}} onClick={logLength}>
          <h1>Today's Positive News Feed</h1>
          {newsArticles && newsArticles.length >= 6 && <Container>
            <Row>
              <Col sm={4}>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[0])}} newsArticle={newsArticles[0]}></NewsFront>
                  <br></br>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[1])}} newsArticle={newsArticles[1]}></NewsFront>
              </Col>
              <Col sm={4}>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[2])}} newsArticle={newsArticles[2]}></NewsFront>
                  <br></br>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[3])}} newsArticle={newsArticles[3]}></NewsFront>
              </Col>
              <Col sm={4}>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[3])}} newsArticle={newsArticles[4]}></NewsFront>
                  <br></br>
                  <NewsFront handleClick={() => {handleClick1(newsArticles[4])}} newsArticle={newsArticles[5]}></NewsFront>
              </Col>
            </Row>
          </Container>}

        </div>
        
        <div style={{backgroundColor: "#282c34"}}>

        </div>
      </AwesomeSlider>
    )
}