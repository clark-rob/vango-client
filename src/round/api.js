import apiUrl from '../apiConfig.js'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}
/*---------------Show Round----------------*/
export const roundGet = (user) => {
  return fetch(apiUrl + '/rounds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
/*---------------Create Round----------------*/
export const roundPost = ( data, user ) => {
  return fetch(apiUrl + '/rounds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      round: { ...data  }
    })
  })
}
/*---------------Update Round----------------*/
export const roundPatch = (data, user ) => {
  const { _id } = data
  delete data.id
  return fetch(apiUrl + '/rounds/' + _id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      round: { ...data  }
    })
  })
}
/*---------------Delete One Round----------------*/
export const roundDelete = (round, user) => {
  return fetch(apiUrl + '/rounds/' + round._id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}
