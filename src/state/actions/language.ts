import { Language } from '../types'
import { createAction } from 'redux-act'

export const CHANGE_LANGUAGE_INIT = createAction<Language>(
  'CHANGE_LANGUAGE_INIT'
)
export const CHANGE_LANGUAGE_SUCCESS = createAction('CHANGE_LANGUAGE_SUCCESS')
export const CHANGE_LANGUAGE_FAIL = createAction<any>('CHANGE_LANGUAGE_FAIL')
export const SET_LANGUAGE = createAction<Language>('SET_LANGUAGE')
