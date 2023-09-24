export const toPattern = (value: string, mask: any | string) => {
  if (!value) {
    return ''
  }
  const DIGIT = '9',
    ALPHA = 'A',
    ALPHANUM = 'S'

  let pattern = typeof mask === 'object' ? mask.pattern : mask,
    patternChars = pattern.replace(/\W/g, ''),
    output = pattern.split(''),
    values = value.toString().replace(/\W/g, ''),
    charsValues = values.replace(/\W/g, ''),
    index = 0,
    i,
    outputLength = output.length,
    placeholder = typeof mask === 'object' ? mask.placeholder : undefined

  for (i = 0; i < outputLength; i++) {
    // Reached the end of input
    if (index >= values.length) {
      if (patternChars.length == charsValues.length) {
        return output.join('')
      } else if (
        placeholder !== undefined &&
        patternChars.length > charsValues.length
      ) {
        return
      } else {
        break
      }
    } else {
      // Remaining chars in input
      if (
        (output[i] === DIGIT && values[index].match(/[0-9]/)) ||
        (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
        (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))
      ) {
        output[i] = values[index++]
      } else if (
        output[i] === DIGIT ||
        output[i] === ALPHA ||
        output[i] === ALPHANUM
      ) {
        if (placeholder !== undefined) {
          return
        } else {
          return output.slice(0, i).join('')
        }
        // exact match for a non-magic character
      } else if (output[i] === values[index]) {
        index++
      }
    }
  }
  return output.join('').substr(0, i)
}
