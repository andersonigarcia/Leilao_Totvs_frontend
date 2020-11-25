import api from '../../utils/api'

const getLeiloes = async ({ commit }) => {
  debugger
  return api.get('Sale')
}

const getCategoriasId = async ({ commit, id }) => {
  return api.get(`Categorias/${id}`)
}

const putCategoria = async ({ commit }, obj) => {
  return api.put('Categorias', obj)
}

const postCategoria = ({ commit }, obj) => {
  return api.post('Categorias', obj)
}

const deletCategoria = ({ commit }, id) => {
  return api.del(`Categorias/${id}`)
}

export {
  getLeiloes,
  getCategoriasId,
  putCategoria,
  postCategoria,
  deletCategoria
}
