import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import TextPad from './TextPad';
import React, {useState, useEffect} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import axios from './axios';
import { Container, Row, Col } from 'react-grid-system';
import ReactCardFlip from 'react-card-flip';

export default function Carousel() {
    
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );
    const [isFlipped1, setIsFlipped1] = useState(false);
    const [isFlipped2, setIsFlipped2] = useState(false);
    const [isFlipped3, setIsFlipped3] = useState(false);
    const [isFlipped4, setIsFlipped4] = useState(false);
    const [isFlipped5, setIsFlipped5] = useState(false);
    const [isFlipped6, setIsFlipped6] = useState(false);
    function logLength() {
      console.log(newsArticles.length)
      console.log(newsArticles)
    }
    function handleClick1(e) {
      e.preventDefault();
      setIsFlipped1(prevState => (!prevState));
    }
    function handleClick2(e) {
      e.preventDefault();
      setIsFlipped2(prevState => (!prevState));
    }
    function handleClick3(e) {
      e.preventDefault();
      setIsFlipped3(prevState => (!prevState));
    }
    function handleClick4(e) {
      e.preventDefault();
      setIsFlipped4(prevState => (!prevState));
    }
    function handleClick5(e) {
      e.preventDefault();
      setIsFlipped5(prevState => (!prevState));
    }
    function handleClick6(e) {
      e.preventDefault();
      setIsFlipped6(prevState => (!prevState));
    }
    const newsArticles = [
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      },
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      },
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      },
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      },
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      },
      {
        urlToImage: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FIn-House%20Stock%2FThanksgiving%2FKitchn_Holiday_Table-2",
        title: "TITLE",
        author: "author",
        description: "description",
        source: "source"
      }
    ]
    // const [newsArticles, setNewsArticles] = useState([])
      const params = {
          journal: editorState.getCurrentContent().getPlainText('\u0001')
      }
      // async function onClick() {
      //   console.log("CLICKe")
      //     const url = "/user/journals/123";
      //     await axios.post(url, params).then(async (result) => {
      //       const url1 = "/user/keywords/123"
      //       await axios.get(url1).then((keywords) => {
      //         console.log(keywords.data)
      //         const keywordSet = new Set(keywords.data)
      //         const keywordData = Array.from(keywordSet)
      //         keywordData.forEach(keyword => {
      //           if (keyword === '') {
      //             return;
      //           }
      //           console.log("now querying for ")
      //           console.log(keyword)
      //           axios.get('https://newsapi.org/v2/everything?q=' + keyword + '&from=2021-11-13&pageSize=100&apiKey=' + process.env.REACT_APP_NEWSAPIKEY)
      //           .then((response) => {
      //             // console.log(keyword)
      //             // console.log(response.data.articles);
      //             const articles = response.data.articles;
      //             console.log(articles)
      //             articles.forEach(async (article) => {
      //               // console.log(article.content)
      //               // console.log(article.description)
      //               const url1 = "/articleSentiment"
      //               const params1 = {
      //                 description: article.description
      //               }
      //               await axios.post(url1, params1).then(sentiment => {
      //                 console.log(sentiment.data)
      //                 if (sentiment.data > .3) {
      //                   const newArticle = {
      //                     title: article.title,
      //                     urlToImage: article.urlToImage,
      //                     description: article.description,
      //                     author: article.author,
      //                     source: article.source.name
      //                   }
      //                   setNewsArticles(prevState => [...prevState, newArticle])
      //                 }
      //               });
      //             })

      //           })
      //           .catch(err => console.log(err));
      //         })

      //       })
      //     });
      // }

    return (
      // onTransitionRequest={onClick}
      <AwesomeSlider> 
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
        <div style={{backgroundColor: "#282c34"}} onClick={logLength}>
          <h1>Today's Positive News Feed</h1>
          <br></br>
          {newsArticles && newsArticles.length >= 6 && <Container>
            <Row>
              <Col sm={4}>
                
              <ReactCardFlip isFlipped={isFlipped1} flipDirection="vertical">
                <div>
                  <img style={{width: "70%"}} src={newsArticles[0].urlToImage} alt="img"/>
                  <button onClick={handleClick1}></button>
                </div>

                <div>
                  <p>{newsArticles[0].title}</p>
                  <p>{newsArticles[0].description}</p>
                  <p>{newsArticles[0].author}</p>
                  <p>{newsArticles[0].source}</p>
                  <button onClick={handleClick1}></button>
                </div>
              </ReactCardFlip>
              <br></br>
              
              <ReactCardFlip isFlipped={isFlipped4} flipDirection="vertical">
                <div>
                  <img style={{width: "70%"}} style={{width: "70%"}} src={newsArticles[1].urlToImage} alt="img"/>
                  <button onClick={handleClick4}></button>
                </div>

                <div>
                  <p>{newsArticles[1].title}</p>
                  <p>{newsArticles[1].description}</p>
                  <p>{newsArticles[1].author}</p>
                  <p>{newsArticles[1].source}</p>
                  <button onClick={handleClick4}></button>
                </div>
              </ReactCardFlip>
              </Col>
              <Col sm={4}>
              <ReactCardFlip isFlipped={isFlipped2} flipDirection="vertical">
                <div>
                  <img style={{width: "70%"}} src={newsArticles[2].urlToImage} alt="img"/>
                  <button onClick={handleClick2}></button>
                </div>
                <div>
                  <p>{newsArticles[2].title}</p>
                  <p>{newsArticles[2].description}</p>
                  <p>{newsArticles[2].author}</p>
                  <p>{newsArticles[2].source}</p>
                  <button onClick={handleClick2}></button>
                </div>
              </ReactCardFlip>
              <br></br>
              <ReactCardFlip isFlipped={isFlipped5} flipDirection="vertical">
                <div>
                  <img style={{width: "70%"}} src={newsArticles[3].urlToImage} alt="img"/>
                  <button onClick={handleClick5}></button>
                </div>
                <div>
                  <p>{newsArticles[3].title}</p>
                  <p>{newsArticles[3].description}</p>
                  <p>{newsArticles[3].author}</p>
                  <p>{newsArticles[3].source}</p>
                  <button onClick={handleClick5}></button>
                </div>
              </ReactCardFlip>
              </Col>
              <Col sm={4}>
              <ReactCardFlip isFlipped={isFlipped3} flipDirection="vertical">
                <div>
                  <img style={{width: "70%"}} src={newsArticles[4].urlToImage} alt="img"/>
                  <button onClick={handleClick3}></button>
                </div>
                <div>
                  <p>{newsArticles[4].title}</p>
                  <p>{newsArticles[4].description}</p>
                  <p>{newsArticles[4].author}</p>
                  <p>{newsArticles[4].source}</p>
                  <button onClick={handleClick3}></button>
                </div>
              </ReactCardFlip>
              <br></br>
              <ReactCardFlip isFlipped={isFlipped6} flipDirection="vertical">
                <div>
                <img style={{width: "70%"}} src={newsArticles[5].urlToImage} alt="img"/>
                  <button onClick={handleClick6}></button>
                </div>
                <div>
                  <p>{newsArticles[5].title}</p>
                  <p>{newsArticles[5].description}</p>
                  <p>{newsArticles[5].author}</p>
                  <p>{newsArticles[5].source}</p>
                  <button onClick={handleClick6}></button>
                </div>
              </ReactCardFlip>
              </Col>
            </Row>
          </Container>}

        </div>
        <div style={{backgroundColor: "#282c34"}}> 

        </div>
        <div style={{backgroundColor: "#282c34"}}>

        </div>
      </AwesomeSlider>
    )
}