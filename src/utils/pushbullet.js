import axios from 'axios'
const BASE_URL = 'https://api.pushbullet.com/v2/pushes'
let _token = localStorage.getItem('token')
async function sendText(text) {
  const response = await axios({
    url: BASE_URL,
    method: 'POST',
    headers: {
      'Access-Token': _token,
    },
    data: {
      type: 'note',
      title: 'Web',
      body: text
    },
  })
  return response.data
}

function setToken(token) {
  _token = token
  localStorage.setItem('token', token)
}

export default {
  sendText,
  setToken,
}
