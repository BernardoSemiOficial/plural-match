import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Company } from '@/model/company'

type RegisterCompanyProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type RegisterCompanyContext = {
  company: Company
  setCompanyData: (company: Company) => void
}

export const registerCompanyContext = createContext(
  {} as RegisterCompanyContext
)

export const RegisterCompanyProvider = ({
  children,
}: RegisterCompanyProviderProps) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<Company>(
    LocalStorageKeys.REGISTER_COMPANY,
    {} as Company
  )
  const [company, setCompany] = useState<Company>(localStorageValue)

  console.log('company', company)

  localStorageValue

  const setCompanyData = useCallback(
    (company: Company) => {
      setCompany(currentCompanyData => {
        const newState = {
          ...currentCompanyData,
          ...company,
        }

        setLocalStorageValue(newState)
        return newState
      })
    },
    [setLocalStorageValue]
  )

  const companyContext = useMemo(
    () => ({
      company,
      setCompanyData,
    }),
    [company, setCompanyData]
  )

  return (
    <registerCompanyContext.Provider value={companyContext}>
      {children}
    </registerCompanyContext.Provider>
  )
}
