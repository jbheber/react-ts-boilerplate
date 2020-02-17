import * as languageActions from '../../actions/language'

import { Action } from 'redux-act'
import { Language } from '../../types'
import { Observable } from 'rxjs'

describe('changeLanguage Epic', () => {
  let epicTest: (
    inputMarble: string,
    expectedMarble: string,
    inputValues: {
      [marble: string]: Action<any, any>
    },
    expectedValues: {
      [marble: string]: Action<any, any>
    },
    state?: { [key: string]: any },
    maxFrames?: number
  ) => void
  let changeLanguageEpic: (
    action$: Observable<Action<any, {}>>
  ) => Observable<Action<Language, {}>>

  beforeEach(() => {
    jest.resetModules()
    changeLanguageEpic = require('./changeLanguage').changeLanguageEpic
    epicTest = epicTester(changeLanguageEpic)
  })

  it('dispatches an SET_LANGUAGE & CHANGE_LANGUAGE_SUCCESS actions if the change language call is fired', () => {
    const inputValues = {
      a: languageActions.CHANGE_LANGUAGE_INIT(Language.EN)
    }
    const expectedValues = {
      b: languageActions.SET_LANGUAGE(Language.EN),
      c: languageActions.CHANGE_LANGUAGE_SUCCESS()
    }

    const inputMarble = 'a'
    const expectedMarble = '(bc)'

    epicTest(inputMarble, expectedMarble, inputValues, expectedValues)
  })
})
