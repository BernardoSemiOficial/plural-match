import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'

export const useLocalStorage = <T>(
  key: LocalStorageKeys,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    let currentValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) ?? JSON.stringify(defaultValue)
      )
    } catch (error) {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue))
  }, [localStorageValue, key])

  return [localStorageValue, setLocalStorageValue]
}
