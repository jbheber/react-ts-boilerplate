import {
  CHANGE_LANGUAGE_FAIL,
  CHANGE_LANGUAGE_INIT,
  CHANGE_LANGUAGE_SUCCESS,
  LOGOUT_SUCCESS,
  SET_LANGUAGE
} from '../../actions'
import { IGlobalState, Language } from '../../types'

import { createReducer } from 'redux-act'

const initialState: IGlobalState = {
  language: Language.EN,
  isChangingLanguage: false
}

export const globalReducer = createReducer(
  {
    [CHANGE_LANGUAGE_INIT.getType()]: state => ({
      ...state,
      isChangingLanguage: true
    }),
    [CHANGE_LANGUAGE_SUCCESS.getType()]: state => ({
      ...state,
      isChangingLanguage: false
    }),
    [CHANGE_LANGUAGE_FAIL.getType()]: state => ({
      ...state,
      isChangingLanguage: false
    }),
    [SET_LANGUAGE.getType()]: (state, payload: Language) => ({
      ...state,
      language: payload
    }),
    [LOGOUT_SUCCESS.getType()]: () => initialState
  },
  initialState
)
