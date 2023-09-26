export const firstLetterOfFirstAndLastName = (fullName: string) => {
  if (!fullName) return fullName
  const fullNameSplit = fullName.split(/\s/)
  const [firstName, lastName] = fullNameSplit ?? []
  const firstLetter = firstName?.[0] ?? 'XX'
  const secondLetter = lastName?.[0] ?? 'X'

  if (!secondLetter) {
    return firstLetter
  }

  return firstLetter.toUpperCase() + secondLetter.toUpperCase()
}
