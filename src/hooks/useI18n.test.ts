import * as i18n from './useI18n'
import * as reactRedux from 'react-redux'

import { en as mock } from './locales/__mocks__/'
import { testHook } from '../testing/TestHookComponent'

jest.mock('./locales')

describe('useI18n', () => {
  let t: (key: string, ...params: string[]) => string

  beforeEach(() => {
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => 'en')
  })

  test('should get string', () => {
    testHook(() => {
      t = i18n.useI18n()
    })
    const localization = t('TEST_1')
    expect(localization).toBe(mock['TEST_1'])
  })

  test('should get string with one param replaced', () => {
    testHook(() => {
      t = i18n.useI18n()
    })
    const localization = t('TESTING_REPLACE_1', 'one')
    expect(localization).toBe('Test replace one strings')
  })

  test('should get string with two params replaced', () => {
    testHook(() => {
      t = i18n.useI18n()
    })
    const localization = t('TESTING_REPLACE_2', 'one', 'two')
    expect(localization).toBe('Test replace one strings and two params')
  })
  test('should return key if string does not exist', () => {
    testHook(() => {
      t = i18n.useI18n()
    })
    const localization = t('DOESNT_EXIST', 'one', 'two')
    expect(localization).toBe('DOESNT_EXIST')
  })

  test('should return string unchanged if does not has replaceable parameters', () => {
    testHook(() => {
      t = i18n.useI18n()
    })
    const localization = t('TEST_1', 'one', 'two')
    expect(localization).toBe(mock['TEST_1'])
  })
})
