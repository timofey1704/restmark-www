export const fetchCustomers = async () => {
  const API_URL = 'https://restmark.by/api/v1'
  // const API_URL = 'http://127.0.0.1:8000/api/v1'

  const response = await fetch(`${API_URL}/customers`)
  if (!response.ok) {
    throw new Error('Failed to fetch customers')
  }

  const data = await response.json()
  return data.objects || []
}
