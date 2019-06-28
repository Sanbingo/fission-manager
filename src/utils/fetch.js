import axios from 'axios';

const config = {
  baseURL: 'http://139.196.86.217:8090/fission'
}

export const get = (url) => {
  return axios.get(url, config)
}

export const post = (url, data) => {
  return axios.post(url, data, config)
}