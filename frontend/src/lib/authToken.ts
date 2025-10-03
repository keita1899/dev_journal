type AuthToken = {
  accessToken: string
  client: string
  uid: string
}

export const saveAuthToken = (headers: Record<string, unknown>) => {
  const accessToken = headers['access-token']
  const client = headers['client']
  const uid = headers['uid']

  if (typeof accessToken === 'string' && typeof client === 'string' && typeof uid === 'string') {
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('client', client)
    localStorage.setItem('uid', uid)
  }
}

export const getAuthToken = (): AuthToken | null => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  if (accessToken && client && uid) {
    return { accessToken, client, uid }
  }
  return null
}

export const clearAuthToken = () => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('client')
  localStorage.removeItem('uid')
}
