import { reactive, watchEffect } from "@vue/composition-api";

export default function useFetch(obj) {
  const state = reactive({
    loading: false,
    error: "",
    data: null
  });

  async function fetchData() {
    state.loading = true;
    state.data = null;
    state.error = "";
    if (obj.type==='get') {
      try {
        const response = await fetch(obj.url, {
          headers: {
            accept: "application/json"
          }
  
        });
  
        if (response.ok) {
          const json = await response.json();
          state.data = json;
        } else {
          const error = await response.json();
          state.error = `${error.message}`;
        }
      } catch (error) {
        state.error = `${error.message}`;
      }
    }
    if (obj.type==='post') {
      fetch(url, {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'foo=bar&lorem=ipsum'
      })
      .then(json)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
    
    }


    state.loading = false;
  }

  watchEffect(() => {
    fetchData();
  });

  return state;
}
