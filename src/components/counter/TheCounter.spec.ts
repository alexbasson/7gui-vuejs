import { describe, it, beforeEach, expect } from 'vitest'
import {DOMWrapper, mount, VueWrapper} from '@vue/test-utils'
import TheCounter from './TheCounter.vue'

describe('Counter', () => {
  let wrapper: VueWrapper
  let counterLabel: Omit<DOMWrapper<Element>, 'exists'>
  let button: Omit<DOMWrapper<HTMLButtonElement>, 'exists'>

  beforeEach(() => {
    wrapper = mount(TheCounter)

    counterLabel = wrapper.get("[data-testid='counter']")
    button = wrapper.get('button')
  })

  describe('on initialization', () => {
    it('sets the counter to zero', () => {
      expect(counterLabel.text()).toBe('0')
    })
  })

  describe('when the button is clicked', () => {
    it('increments the counter by one', async () => {
      await button.trigger('click')

      expect(counterLabel.text()).toBe('1')
    })
  })
})
