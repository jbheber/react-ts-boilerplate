/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { ActionsObservable, StateObservable } from 'redux-observable'
import { Observable, Scheduler } from 'rxjs'
import React, { Reducer } from 'react'
import { ReactWrapper, configure, mount } from 'enzyme'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'

import { Action } from 'redux-act'
import Adapter from 'enzyme-adapter-react-16'
import { AnyAction } from 'redux'
import { TestComponent } from './testing/TestComponent'
import { TestScheduler } from 'rxjs/testing'
import deepFreeze from 'deep-freeze'

configure({ adapter: new Adapter() })

// Use this to test reducers
const reducerTester = (reducer: Reducer<any, AnyAction>) => (
  currentState: { [key: string]: any },
  action: AnyAction,
  expectedState: { [key: string]: any }
): void => {
  if (currentState && typeof currentState === 'object') {
    deepFreeze(currentState)
  }
  const newState = reducer(currentState, action)
  return expect(newState).toEqual(expectedState)
}

// Use this to test epics
const epicTester = (
  epic: (
    action$: ActionsObservable<Action<any, {}>>,
    state$?: StateObservable<any>,
    ts?: Scheduler
  ) => Observable<Action<any, {}>>
) => (
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
) => {
  const ts = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

  const action$ = new ActionsObservable(
    ts.createHotObservable(inputMarble, inputValues) as any
  ) as any
  const state$ = {
    value: state
  } as StateObservable<any>
  const outputAction = epic(action$, state$, ts)

  ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

  if (maxFrames) {
    ts.maxFrames = maxFrames
  }

  ts.flush()
}

// Use this to add N time frames for epic tests
const addTimeFrames = (milliseconds: number, value: string = '') =>
  `${'-'.repeat(milliseconds / 10)}${value}`

const mockedStore = (initial: { [key: string]: any } = {}) =>
  configureStore([
    /* place middlewares here */
  ])(initial)

// Use this to test mounted components w/ store connection
const mountWithProvider = (children: React.ReactNode) => (initialState: {
  [key: string]: any
}) => {
  const store = mockedStore(initialState)
  const component = React.createElement(
    TestComponent,
    {
      store: store
    },
    children
  )
  return {
    component: mount(component),
    store
  }
}

// Add global functions
const _global = global as any
_global.mountWithProvider = mountWithProvider
_global.reducerTester = reducerTester
_global.epicTester = epicTester
_global.addTimeFrames = addTimeFrames

declare global {
  function reducerTester(
    reducer: Reducer<any, AnyAction>
  ): (
    currentState: { [key: string]: any },
    action: AnyAction,
    expectedState: { [key: string]: any }
  ) => {}

  function mountWithProvider(
    children: React.ReactNode
  ): (initialState: {
    [key: string]: any
  }) => {
    component: ReactWrapper<
      {
        store: MockStoreEnhanced<unknown, {}>
      },
      Readonly<{}>,
      React.Component<{}, {}, any>
    >
    store: MockStoreEnhanced<unknown, {}>
  }

  function epicTester(
    epic: (
      action$: ActionsObservable<Action<any, {}>>,
      state$?: StateObservable<any>,
      ts?: Scheduler
    ) => Observable<Action<any, {}>>
  ): (
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
}
