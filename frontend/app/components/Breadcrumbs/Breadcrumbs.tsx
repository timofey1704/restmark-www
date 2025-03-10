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
    <Breadcrumb className=" sm:text-xs ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="font-velasans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white"
            href="/"
          >
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {category && (
          <>
            <BreadcrumbItem className="font-velasans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white">
              <BreadcrumbLink
                href={`/frontend/app/(urls)/search/${category}`}
                className="font-velasans text-sm sm:text-sm md:text-lg lg:text-xl hover:text-white"
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
