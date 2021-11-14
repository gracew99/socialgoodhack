const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const UserJournals = require('./userModel.js')
const {spawn} = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
  res.setHeader("Access-Control-Allow-Headers", "*"),
  next();
})
const connection_url = process.env.MONGO_URL;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// register a new debate
app.post('/user/journals/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    UserJournals.updateOne({id:id}, {$push: {journals: req.body.journal}}, (err, data) => {
        if (err){
            console.log("ERROR")
            res.status(500).send(err)
            console.log(err)
        } else{
            console.log("OK")
            const copiedData = JSON.parse(JSON.stringify(data));
            // res.status(201).send(copiedData)

            var dataToSend;
            // spawn new child process to call the python script
            const python = spawn('python3', ['keywordExtractor.py', req.body.journal]);
            // collect data from script
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
            });
            // in close event we are sure that stream from child process is closed
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                // res.send(dataToSend)
                console.log(dataToSend)
                dataToSend = dataToSend.substring(1,dataToSend.length-2);
                dataToSend = dataToSend.split(", ");
                console.log(dataToSend)
                UserJournals.updateOne({id:id}, {$push: {keywords: dataToSend}}, (err, data) => {
                    if (err){
                        console.log("ERROR")
                        res.status(500).send(err)
                        console.log(err)
                    } else{
                        console.log("OK")
                        const copiedData1 = JSON.parse(JSON.stringify(data));
                        res.status(201).send(copiedData1)
                    }
                })
            });


        }
    })
  
  })

  app.post('/articleSentiment', (req, res) => {
     
      console.log("article sentiment receives")
      console.log(req.body.description)

      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python3', ['sentimentAnalysis.py', req.body.description]);
      // collect data from script
      python.stdout.on('data', function (data) {
          console.log('Pipe data from python script ...');
          dataToSend = data.toString();
      });
      // in close event we are sure that stream from child process is closed
      python.on('close', (code) => {
          console.log(`child process close all stdio with code ${code}`);
          // send data to browser
          // res.send(dataToSend)
          console.log(dataToSend)
          
          res.status(201).send(dataToSend)
      });


  })
  app.get('/user/keywords/:id', (req, res) => {
    const id = req.params.id;
    
        UserJournals.find({id}, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data[0])
                res.status(200).send(data[0].keywords)
            }
        })
  })




  app.listen(8000, () =>
  console.log(`Express server is running on localhost:${8000}`)
);