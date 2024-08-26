import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbsProps {
  category?: string
}

const categoryDisplayNames: { [key: string]: string } = {
  steklo: 'Стекло',
  inventar: 'Инвентарь',
  bar: 'Бар',
  sales: 'Акции',
  farvor: 'Фарфор',
  'stolovie-pribori': 'Столовые приборы',
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category }) => {
  const displayName = category
    ? categoryDisplayNames[category] || category
    : null
  return (
    <Breadcrumb className="ml-24">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="font-fivo-sans text-xl hover:text-white"
            href="/"
          >
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {category && (
          <>
            <BreadcrumbItem className="font-fivo-sans text-xl hover:text-white">
              <BreadcrumbLink
                href={`/search/${category}`}
                className="font-fivo-sans text-xl hover:text-white"
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
