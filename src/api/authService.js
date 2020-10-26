import httpClient from './httpClient'

const END_POINT='/auth'

export default {
  getToken(obj) {
    return httpClient.post(END_POINT,{},{
      auth:{
        username: obj.Username,
        password: obj.Password
      }
    })
  }
}

