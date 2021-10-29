const api = require('./AtelierAPI');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../Client/dist'));

app.get('/qa/questions/', (req, res) => {
  console.log(req.query.product_id);
  api.getQuestions(req.query.product_id, (err, results) => {
    console.log(err);
    if (!err) {
      res.status(200).send(results);
    } else {
      res.sendStatus(404)
    }
  });
});


let port = 3000;
app.listen(port, () => {
  console.log("Listening on port:", port);
});