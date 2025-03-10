import { MainPageData } from '@/app/types'

export async function fetchMain(): Promise<MainPageData> {
  // const API_URL = 'https://restmark.by/api/v1'
  const API_URL = 'http://127.0.0.1:8000/api/v1'

  const response = await fetch(`${API_URL}/main/`)
  if (!response.ok) {
    throw new Error('Failed to fetch main page data')
  }

  const data = await response.json()
  return data || []
}
