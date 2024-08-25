import React from 'react'

const SearchCategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params

  return (
    <div>
      <h1>Search Category: {category}</h1>
      <p>This page shows results for the category: {category}</p>
    </div>
  )
}

export default SearchCategoryPage
