export default {
  get: async (url, config = {}) => {
    try {
      const res = await fetch(url, {
        headers: config.headers
      })
      return {
        data: await res.json()
      }
    } catch (error) {
      throw {
        response: {
          data: {
            error
          }
        }
      }
    }
  },
  post: async (url, body = {}, config = {}) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(body),
      })
      return await {
        data: res.json()
      }
    } catch (error) {
      throw {
        response: {
          data: {
            error
          }
        }
      }
    }
  },
  delete: async (url, config = {}) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: config.headers,
      })
      return await {
        data: res.json()
      }
    } catch (error) {
      throw {
        response: {
          data: {
            error
          }
        }
      }
    }
  } 
}