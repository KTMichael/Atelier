const api = require('./AtelierAPI');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../Client/dist'));

app.get('/qa/questions/', (req, res) => {
  api.getQuestions(req.query.product_id, (err, response) => {
    if (!err) {
      res.status(response.status).send(response.data.results);
    } else {
      res.sendStatus(err.response.status)
    }
  });
});

app.post('/qa/questions', (req, res) => {
  api.addQuestion(req.body, (err, response) => {
    if (!err) {
      res.status(response.status).send(response.data);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log('question helpful', req.params.question_id);
  api.helpfulQuestion(req.params.question_id, (err) => {
    if (!err) {
      res.sendStatus(204);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  api.reportQuestion(req.params.answer_id, (err) => {
    if (!err) {
      res.sendStatus(204);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  api.helpfulAnswer(req.params.answer_id, (err) => {
    if (!err) {
      res.sendStatus(204);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  api.reportAnswer(req.params.answer_id, (err) => {
    if (!err) {
      res.sendStatus(204);
    } else {
      console.log(err);
      res.sendStatus(err.response.status);
    }
  })
})

app.get('/products/:product_id', (req, res) => {
  api.getProduct(req.params.product_id, (err, response) => {
    if (err) {
      console.log(err)
      res.sendStatus(err.response.status);
    } else {
      res.status(response.status).send(response.data)
    }
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  api.getStyles(req.params.product_id, (err, response) => {
    if (err) {
      console.log(err)
      res.sendStatus(err.response.status);
    } else {
      res.status(response.status).send(response.data.results)
    }
  })
})

app.post('/cart', (req, res) => {
  api.addItemToCart(req.body, (err, response) => {
    if (err) {
      res.sendStatus(err.response.status);
    } else {
      res.status(response.status)
    }
  })
})


// Ratings and Reviews

app.get('/products', (req, res) => {
  api.getProducts((err, response) => {
    if (err) {
      res.status(response.status).send(response.data.results);
    } else {
      res.sendStatus(err.response.status)
    }
  });
});


let port = 3000;
app.listen(port, () => {
  console.log("Listening on port:", port);
});