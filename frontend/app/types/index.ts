export type TitleItem = {
  id?: number
  title: string
  img_url: string
  url: string
}

export type ProductDisplayProps = {
  title: string
  img_url: string
}

export interface Photo {
  id: number
  filename: string
  path: string
  file?: File | null
}

export interface Collection {
  id: number
  name: string
  price: number
  discount_price: number
  discount_percent: number
  photos: Photo[]
  collection_url: string
}

export interface Product {
  id: number
  title: string
  country_prod: string
  category: string
  collections: Collection[]
  pdf: string
  collection_url?: string
}

export interface ItemCardProps {
  brandName: string
  collections: Collection[]
  catalog_url: string
  collection_url?: string
}

export interface Lead {
  message: string
  phone?: string
  date?: string
}

export interface LeadState {
  leads: Lead[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface LeadRequest {
  url: string
  data: Lead
}

export interface Customer {
  id: number
  customer_name: string
  img_url: string
  link: string
}

export interface BreadcrumbsProps {
  category?: string
}

export interface CallButtonProps {
  text: string
}

export interface CustomersProps {
  customers: Customer[]
}

export interface ImageSliderProps {
  images: string[]
}

export interface LeadPopupProps {
  onClose: () => void
}

export interface LeadPopupContentProps {
  onClose: () => void
}
