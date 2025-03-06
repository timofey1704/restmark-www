import { Product } from '@/app/types'

export async function fetchProducts(): Promise<Product[]> {
  const API_URL = 'http://127.0.0.1:8000/api/v1'
  // const API_URL = 'https://restmark.by/api/v1'

  try {
    const res = await fetch(
      `${API_URL}/items`,
      { cache: 'no-store' }
      // next: { revalidate: 3600 } -- если будет нужно кешировать, то заменить cache: no-store на эту строку
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
