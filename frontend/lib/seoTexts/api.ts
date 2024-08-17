interface SeoText {
  id: number
  text: string
}

export async function fetchSeoTexts(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch('http://localhost:4000/api/texts')
    if (!response.ok) {
      throw new Error('Network response failed')
    }

    const data: SeoText[] = await response.json()

    // преобразуем массив объектов в объект с ключами по id
    const seoTexts: { [key: string]: string } = data.reduce((acc, item) => {
      acc[`text${item.id}`] = item.text
      return acc
    }, {} as { [key: string]: string })

    return seoTexts
  } catch (error) {
    console.error('Failed to fetch SEO texts:', error)
    return {} // возвращаем пустой объект в случае ошибки
  }
}
