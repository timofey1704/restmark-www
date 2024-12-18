import { Seolinks } from '@/app/types'

export async function fetchSitemapLinks(): Promise<Seolinks[]> {
  const API_URL = 'https://restmark.by/api/v1'
  try {
    const res = await fetch(`${API_URL}/seolinks/`)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    console.log(data)
    if (!data) {
      console.error('Invalid data structure received:', data)
      throw new Error('Invalid data structure received')
    }

    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}