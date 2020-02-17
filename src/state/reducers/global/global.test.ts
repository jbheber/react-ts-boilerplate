import * as authActions from '../../actions/auth'
import * as languageActions from '../../actions/language'

import { Language } from '../../types'
import { createAction } from 'redux-act'
import { globalReducer } from '.'

describe('Language reducer', () => {
  const reducerTest = reducerTester(globalReducer)

  it('returns the initial state', () => {
    const randomAction = createAction('RANDOM_ACTION')
    reducerTest({ locale: 'en' }, randomAction(), { locale: 'en' })
  })

  it('changes language when SET_LANGUAGE action is fired', () => {
    reducerTest(
      { language: Language.EN },
      languageActions.SET_LANGUAGE(Language.ES),
      {
        language: Language.ES
      }
    )
  })

  it('sets isChangingLanguage true when CHANGE_LANGUAGE_INIT action is fired', () => {
    reducerTest(
      { language: Language.EN, isChangingLanguage: false },
      languageActions.CHANGE_LANGUAGE_INIT(Language.ES),
      { language: Language.EN, isChangingLanguage: true }
    )
  })

  it('sets isChangingLanguage false when CHANGE_LANGUAGE_SUCCESS action is fired', () => {
    reducerTest(
      { language: Language.EN, isChangingLanguage: true },
      languageActions.CHANGE_LANGUAGE_SUCCESS(),
      { language: Language.EN, isChangingLanguage: false }
    )
  })

  it('sets isChangingLanguage false when CHANGE_LANGUAGE_INIT action is fired', () => {
    reducerTest(
      { language: Language.EN, isChangingLanguage: true },
      languageActions.CHANGE_LANGUAGE_FAIL({ err: 'something happen' }),
      { language: Language.EN, isChangingLanguage: false }
    )
  })

  it('return to initial state when LOGOUT_SUCCESS action is fired', () => {
    reducerTest(
      { language: Language.ES, isChangingLanguage: true },
      authActions.LOGOUT_SUCCESS(),
      { language: Language.EN, isChangingLanguage: false }
    )
  })
})
