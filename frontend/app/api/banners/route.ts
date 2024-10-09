import { NextResponse } from 'next/server'
import { fetchBanners } from '@/lib/fetchBanners'

export async function GET() {
  try {
    const banners = await fetchBanners()
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.error()
  }
}
