export const firstLetterOfFirstAndLastName = (fullName: string) => {
  if (!fullName) return fullName
  const fullNameSplit = fullName.split(/\s/)
  const [firstName, lastName] = fullNameSplit ?? []
  const firstLetter = firstName[0] ?? 'XX'
  const secondLetter = lastName[0] ?? 'XX'
  return firstLetter + secondLetter
}
