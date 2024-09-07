export type TitleProps = {
  titles: TitleItem[]
}

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
}

export interface Collection {
  id: number
  name: string
  price: number
  discount_price: number
  discount_percent: number
  photos: Photo[]
}

export interface Product {
  id: number
  title: string
  country_prod: string
  category: string
  collections: Collection[]
}

export interface ItemCardProps {
  brandName: string
  collections: Collection[]
  catalog_url: string
}

export interface ImageSliderProps {
  images: string[]
}

export interface Lead {
  message: string
  phone?: string
  date?: string
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
