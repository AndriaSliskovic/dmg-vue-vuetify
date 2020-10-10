import { reactive, watchEffect } from "@vue/composition-api";

export default function useFetch(url) {
  const state = reactive({
    loading: false,
    error: "",
    data: null
  });

  async function fetchData() {
    state.loading = true;
    state.data = null;
    state.error = "";

    try {
      const response = await fetch(url.value, {
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

    state.loading = false;
  }

  watchEffect(() => {
    fetchData();
  });

  return state;
}
