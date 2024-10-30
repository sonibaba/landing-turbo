'use server'

import { cookies } from 'next/headers'

interface ArgsDynamic {
  [key: string]: unknown
}

const fetchResponse = async (
  url: string,
  method: string,
  args?: ArgsDynamic
): Promise<{ error: boolean; message?: string; data?: ArgsDynamic }> => {
  const cookieStore = await cookies()

  console.log({ args })

  const response = await fetch(`https://sandbox3.huastecanetwork.com/api/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookieStore.get('token')}`,
    },
    body: JSON.stringify(args),
  })
  if (response.status != 200) {
    console.log(response)
    return {
      error: true,
      message: await response.text(),
    }
  }
  const data = await response.json()
  return {
    error: false,
    data: data,
  }
}

export default fetchResponse
