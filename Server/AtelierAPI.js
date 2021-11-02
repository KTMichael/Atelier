const axios = require('axios');

const path = require('path');
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const TOKEN = require('../config.js').TOKEN;

const config = {
  headers: {
    Authorization: TOKEN
  }
};

module.exports = {
  getQuestions: (product_id, callback) => {
    let url = `${apiUrl}/qa/questions/?product_id=${product_id}`;
    axios.get(url, config)
    .then(response => {callback(null, response.data.results)})
    .catch(err => {callback(err)});
  },

  applyHelpfulQuestion: (answer_id, callback) => {
    let url = `${apiUrl}/qa/answers/${answer_id}/helpful`;
    console.log(url);
    axios.put(url, '', config)
    .then(() => {callback(null)})
    .catch(err => {callback(err)});
  }
}