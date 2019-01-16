const apiUrl = 'http://localhost:4741'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const roundGet = (user) => {
  return fetch(apiUrl + '/rounds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const roundPost = (number, phrase, drawing, user) => {
  console.log(number)
  return fetch(apiUrl + '/rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      round: {
        number: number,
        phrase: phrase,
        drawing: drawing
      }
    })
  })
}
