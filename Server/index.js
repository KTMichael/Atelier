const api = require('./AtelierAPI');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../Client/dist'));

app.get('/qa/questions/', (req, res) => {
  api.getQuestions(req.query.product_id, (err, results) => {
    if (!err) {
      res.status(200).send(results);
    } else {
      res.sendStatus(404)
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('Making a put request, Answer_id:', req.params.answer_id)
  api.applyHelpfulQuestion(req.params.answer_id, (err) => {
    if (!err) {
      res.sendStatus(204);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})


let port = 3000;
app.listen(port, () => {
  console.log("Listening on port:", port);
});