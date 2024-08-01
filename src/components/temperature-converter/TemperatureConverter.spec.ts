import { describe, beforeEach, it, expect } from 'vitest'
import {DOMWrapper, mount, VueWrapper} from '@vue/test-utils'
import TemperatureConverter from './TemperatureConverter.vue'

describe('TemperatureConverter', () => {
  let wrapper: VueWrapper
  let celsiusField: Omit<DOMWrapper<HTMLInputElement>, 'exists'>
  let fahrenheitField: Omit<DOMWrapper<HTMLInputElement>, 'exists'>

  beforeEach(() => {
    wrapper = mount(TemperatureConverter)

    celsiusField = wrapper.get("[name='celsius']")
    fahrenheitField = wrapper.get("[name='fahrenheit']")
  })

  describe('when entering a temperature into the celsius field', () => {
    it('populates the fahrenheit field with the correct temperature', async () => {
      await celsiusField.setValue('0')

      expect(fahrenheitField.element.value).toBe('32')
    })
  })

  describe('when entering a temperature into the fahrenheit field', () => {
    it('populates the celsius field with the correct temperature', async () => {
      await fahrenheitField.setValue('212')

      expect(celsiusField.element.value).toBe('100')
    })
  })

  describe('when clearing a field', () => {
    it('clears the other field', async () => {
      await celsiusField.setValue('0')
      expect(fahrenheitField.element.value).toBe('32')

      await celsiusField.setValue('')
      expect(fahrenheitField.element.value).toBe('')

      await fahrenheitField.setValue('32')
      expect(celsiusField.element.value).toBe('0')

      await fahrenheitField.setValue('')
      expect(celsiusField.element.value).toBe('')
    })
  })

  describe('when inputing non-numerical values', () => {
    it('does not update the fields', async () => {
      await celsiusField.setValue('0')
      expect(fahrenheitField.element.value).toBe('32')

      await celsiusField.setValue('not a number')
      expect(fahrenheitField.element.value).toBe('32')

      await fahrenheitField.setValue('212')
      expect(celsiusField.element.value).toBe('100')

      await fahrenheitField.setValue('not a number')
      expect(celsiusField.element.value).toBe('100')
    })
  })
})
