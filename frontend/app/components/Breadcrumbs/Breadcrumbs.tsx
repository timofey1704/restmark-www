import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BreadcrumbsProps } from '@/app/types'

const categoryDisplayNames: { [key: string]: string } = {
  steklo: 'Стекло',
  inventar: 'Инвентарь',
  bar: 'Бар',
  sales: 'Акции',
  farfor: 'Фарфор',
  'stolovie-pribori': 'Столовые приборы',
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category }) => {
  const displayName = category
    ? categoryDisplayNames[category] || category
    : null
  return (
    <Breadcrumb className="ml-4 sm:ml-8 sm:text-xs md:ml-16 lg:ml-24">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="font-fivo-sans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white"
            href="/"
          >
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {category && (
          <>
            <BreadcrumbItem className="font-fivo-sans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white">
              <BreadcrumbLink
                href={`/search/${category}`}
                className="font-fivo-sans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white"
              >
                {displayName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
