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
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const MySwal = withReactContent(Swal)
const phrase1 = "I am loved and valued"
const phrase2 = "I am thankful for my life"
const phrase3 = "Today is going to be a great day"
var color1 = 'white';
var color2 = 'white';
var color3 = 'white';

export default function Carousel() {
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
      handleListen()
    }, [isListening])
    const handleListen = () => {
      if (isListening) {
        mic.start()
        mic.onend = () => {
          console.log('continue..')
          mic.start()
        }
      } else {
        if (note && note.trim().toLowerCase() === phrase1.toLowerCase()) {
          color1 = 'pink';
        }
        if (note && note.trim().toLowerCase() === phrase2.toLowerCase()) {
          color2 = 'orange';
        }
        if (note && note.trim().toLowerCase() === phrase3.toLowerCase()) {
          color3 = 'green';
        }
        mic.stop()
        mic.onend = () => {
          console.log(note)
          console.log('Stopped Mic on Click')
        }
      }
      mic.onstart = () => {
        console.log('Mics on')
      }
  
      mic.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        console.log(transcript)
        setNote(transcript)
        mic.onerror = event => {
          console.log(event.error)
        }
      }
    }
    
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
                        if (sentiment.data) {
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
                          setNewsArticles(prevState => prevState.sort((x, y) => x.score >= y.score ? -1 : 1))
                          
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
          <p style={{color: color1}}>{phrase1}</p>
          <p style={{color: color2}}>{phrase2}</p>
          <p style={{color: color3}}>{phrase3}</p>
          {isListening ? <span>🎙️</span> : <span></span>}
          <button style={{marginRight: "10px"}} onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</button>
          <button style={{marginLeft: "10px"}} onClick={() => {setNote(null); setIsListening(false)}}>Clear</button>
          <p>{note}</p>
          
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