import * as i18n from '../../hooks/useI18n'
import * as reactRedux from 'react-redux'

import { CHANGE_LANGUAGE_INIT } from '../../state/actions'
import Home from '.'
import { Language } from '../../state/types'
import React from 'react'

describe('Home page', () => {
  let dispatchMock: jest.Mock<any, any>

  beforeEach(() => {
    dispatchMock = jest.fn()
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock)
    jest
      .spyOn(i18n, 'useI18n')
      .mockImplementation(() => (key, ...params) =>
        `${key.toUpperCase()} ${params.join('_')}`.trim()
      )
  })
  it('renders without crashing', () => {
    const { component } = mountWithProvider(<Home />)({
      global: { language: Language.EN }
    })
    expect(component).toMatchSnapshot()
  })

  it('Fires a change language on click `en` -> `es`', () => {
    const { component } = mountWithProvider(<Home />)({
      global: { language: Language.EN }
    })
    component.find('p').simulate('click')
    expect(dispatchMock).toBeCalledWith(CHANGE_LANGUAGE_INIT(Language.ES))
  })

  it('Fires a change language on click `es` -> `en`', () => {
    const { component } = mountWithProvider(<Home />)({
      global: { language: Language.ES }
    })
    component.find('p').simulate('click')
    expect(dispatchMock).toBeCalledWith(CHANGE_LANGUAGE_INIT(Language.EN))
  })
})
