export interface IGlobalState {
  language: Language
  isChangingLanguage: boolean
}

export enum Language {
  ES = 'es',
  EN = 'en'
}
