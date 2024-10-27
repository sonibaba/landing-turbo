interface ArgsDynamic {
  [key: string]: unknown
}

const fetchResponse = async (url: string, method: string, args?: ArgsDynamic) => {
  const response = await fetch(`https://sandbox3.huastecanetwork.com/api/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(args),
  })
  if (response.status != 200) {
    console.log(response)
    return null
  }
  const data = await response.json()
  return data
}

export default fetchResponse
