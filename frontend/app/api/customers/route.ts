import { NextResponse } from 'next/server'
import { fetchCustomers } from '@/lib/fetchCustomers'

export async function GET() {
  try {
    const customers = await fetchCustomers()
    return NextResponse.json(customers)
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.error()
  }
}
