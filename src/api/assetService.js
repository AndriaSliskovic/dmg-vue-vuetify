
import httpClient from './httpClient'
  export default {
    getAssets(obj) {  
        const END_POINT = `/asset/${obj.id}/widget`
        return httpClient.get(END_POINT)
       }
  } 
