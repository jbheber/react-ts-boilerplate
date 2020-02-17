import * as languageActions from '../../actions/language'

import { Observable, merge, of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'

import { Action } from 'redux-act'
import { ofType } from 'redux-observable'

export const changeLanguageEpic = (action$: Observable<Action<any>>) => {
  return action$.pipe(
    ofType(languageActions.CHANGE_LANGUAGE_INIT.getType()),
    mergeMap(({ payload }) =>
      merge(
        of(languageActions.SET_LANGUAGE(payload)),
        of(languageActions.CHANGE_LANGUAGE_SUCCESS())
      )
    ),
    catchError(error => of(languageActions.CHANGE_LANGUAGE_FAIL(error)))
  )
}
