export const EVENT = 'EVENT'

export function onEvent (event) {
  const { data } = event

  // Deserialize the array
  const messages = JSON.parse(data)

  console.log('messages test:', messages)

  return {
    type: EVENT,
    payload: messages
  }
}
