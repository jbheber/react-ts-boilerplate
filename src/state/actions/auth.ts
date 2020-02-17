import { createAction } from 'redux-act'

export const LOGOUT_INIT = createAction<string>('LOGOUT_INIT')
export const LOGOUT_SUCCESS = createAction('LOGOUT_SUCCESS')
export const LOGOUT_FAIL = createAction('LOGOUT_FAIL')
