import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://localhost:7260', // 'http://localhost:5260' || 'https://localhost:7260'
  headers: {
    'Content-Type': 'application/json',
  },
})
