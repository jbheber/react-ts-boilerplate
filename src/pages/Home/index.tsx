import './Home.scss'

import { IState, Language } from '../../state/types'
import { useDispatch, useSelector } from 'react-redux'

import { CHANGE_LANGUAGE_INIT } from '../../state/actions'
import { Dispatch } from 'redux'
import React from 'react'
import logo from './logo.svg'
import { useI18n } from '../../hooks'

function onClickHandler(dispatch: Dispatch<any>, language: Language) {
  const nextLang = Language.EN === language ? Language.ES : Language.EN
  return () => dispatch(CHANGE_LANGUAGE_INIT(nextLang))
}

const Home = () => {
  const t = useI18n()
  const dispatch = useDispatch()
  const language = useSelector<IState, Language>(state => state.global.language)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClickHandler(dispatch, language)}>{t('CLICK_HERE')}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('LEARN_REACT')}
        </a>
      </header>
    </div>
  )
}

export default Home
