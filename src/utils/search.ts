export function deepMatchValue(value: string, expected: string) {
  return removeAccents(String(value).toLowerCase()).includes(
    removeAccents(String(expected).toLowerCase())
  )
}

export function removeAccents(text: string) {
  text = text.toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
  return text
}
