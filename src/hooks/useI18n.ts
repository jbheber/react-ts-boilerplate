import * as languages from './locales'

import { IState, Language } from '../state/types'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'

interface ILanguageFiles {
  [key: string]: {
    [key: string]: string
  }
}

const getTranslate = (translations: { [key: string]: string }) => (
  key: string,
  ...params: string[]
) => {
  let value = translations[key] || key
  if (params) {
    params.forEach((p, idx) => {
      value = value.replace(`{${idx}}`, p)
    })
  }

  return value
}

/**
 * Custom hook to get localized strings.
 * Will return a function that gets the localized string for a given key.
 */
export const useI18n = () => {
  const language = useSelector<IState, Language>(state => state.global.language)
  const languageFile: ILanguageFiles = languages
  return useMemo(() => getTranslate(languageFile[language]), [
    language,
    languageFile
  ])
}
