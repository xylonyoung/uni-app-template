export function createMutations(state) {
  const result = {}
  Object.keys(state).forEach((e) => {
    result[snakeCase(e)] = (state, data) => {
      state[e] = data
    }
  })
  return result

  function snakeCase(str) {
    const result = str.replace(/A-Z/g, function (match, letter) {
      return `_${letter}`
    })
    return `SET_${result.toUpperCase()}`
  }
}
