import _axios from 'axios'

const url = window.location
debugger

const axios = _axios.create({
  baseURL: `https://${url.hostname}${url.port ? ':44730' : ''}/api/`,
  timeout: 30000
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const result = error.response
    // timeout
    if (result === undefined && error.message && error.message.indexOf('timeout') === 0) return Promise.resolve({ status: 'timeout', timeout: error.config.timeout })
    // 400:Bad Request contendo data trata-se de erro lógico produzido pela api com informação para o usuário
    if (result && result.status === 400 && result.data) return Promise.resolve(result)
    // 401:Unauthorized trata-se de erro lógico produzido pela api indicando que o usuário não te permissão de acesso ao recurso
    if (result && result.status === 401) return Promise.resolve(result)
    // demais erros são do protocolo/comunicação/servidor e não são tratados pela api
    console.log(error)
    return Promise.reject(error)
  })

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

export { axios }
