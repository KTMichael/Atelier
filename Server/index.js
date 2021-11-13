const api = require('./AtelierAPI');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../Client/dist'));
app.use(cors());
app.options('/reviews', cors())
// Get all products

app.get('/products', (req, res) => {
  api.getAllProducts((error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      // console.log('res', results.data)
      res.status(201).send(results.data);
    }
  });
});


//Q&A
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

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Add Answer body:', req.body);
  console.log('Question_id:', req.params.question_id)
  api.addAnswer(req.params.question_id, req.body, (err) => {
    if (!err) {
      res.sendStatus(201);
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
app.get('/reviews/meta/', (req, res) => {
  api.getReviewData(req.query.product_id, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(results.data);
    }
  });
});

app.get('/reviews', (req, res) => {
  api.getReviews(req.query, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).send(results.data);
    }
  });
});

app.post('/reviews', (req, res) => {
  api.addReview(req.body.data, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(201).send(results.statusText)
    }
  })
})

app.put('/reviews/:review_id/helpful', (req, res) => {

  api.ReviewHelpful(req.params.review_id, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(201).send(results.statusText)
    }
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
  api.ReviewReported(req.params.review_id, (error, results) => {
    if (error) {
      res.status(404).send(error);
    } else {
      res.status(201).send(results.statusText)
    }
  })
})


// Related Products
app.get('/products/:product_id/related', (req, res) => {
  // console.log(req.params);
  api.getRelatedProducts(req.params.product_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(results.data);
    }
  })
})

let port = 3000;
app.listen(port, () => {
  console.log("Listening on port:", port);
});