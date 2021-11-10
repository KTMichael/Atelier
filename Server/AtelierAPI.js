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
    .then(response => {callback(null, response)})
    .catch(err => {callback(err)});
  },

  addQuestion: (data, callback) => {
    let url = `${apiUrl}/qa/questions/`;
    axios.post(url, data, config)
    .then(response => {callback(null, response)})
    .catch(err => {callback(err)});
  },

  helpfulQuestion: (question_id, callback) => {
    let url = `${apiUrl}/qa/questions/${question_id}/helpful`;
    axios.put(url, '', config)
    .then(() => {callback(null)})
    .catch(err => {callback(err)});
  },

  reportQuestion: (question_id, callback) => {
    let url = `${apiUrl}/qa/questions/${question_id}/report`;
    axios.put(url, '', config)
    .then(() => {callback(null)})
    .catch(err => {callback(err)});
  },

  helpfulAnswer: (answer_id, callback) => {
    let url = `${apiUrl}/qa/answers/${answer_id}/helpful`;
    axios.put(url, '', config)
    .then(() => {callback(null)})
    .catch(err => {callback(err)});
  },

  reportAnswer: (answer_id, callback) => {
    let url = `${apiUrl}/qa/answers/${answer_id}/report`;
    axios.put(url, '', config)
    .then(() => {callback(null)})
    .catch(err => {callback(err)});
  },

  getProduct: (product_id, callback) => {
    let url = `${apiUrl}/products/${product_id}`
    axios.get(url, config)
      .then( result => {callback(null, result)})
      .catch( err => {callback(err)})
  }
}