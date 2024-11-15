export const fetchBanners = async () => {
  const API_URL = 'https://restmark.by/api/v1'
  // const API_URL = 'http://127.0.0.1:8000/api/v1'

  const response = await fetch(`${API_URL}/banners`)
  if (!response.ok) {
    throw new Error('Failed to fetch banners')
  }

  const data = await response.json()
  return data.objects || []
}
