import {beforeEach, describe, expect, it} from 'vitest'
import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils"
import FlightBooker from "./FlightBooker.vue"
import DateFormatter from "@/components/flight-booker/date-formatter";

describe('FlightBooker.vue', () => {
  let wrapper: VueWrapper
  let dropdown: DOMWrapper<HTMLSelectElement>
  let departureInput: DOMWrapper<HTMLInputElement>
  let returnInput: DOMWrapper<HTMLInputElement>
  let form: DOMWrapper<HTMLFormElement>

  beforeEach(() => {
    wrapper = mount(FlightBooker)

    form = wrapper.find('form')
    dropdown = wrapper.find("select")
    departureInput = wrapper.find("input[name='departure']")
    returnInput = wrapper.find("input[name='return']")
  })

  describe('on initialization', () => {
    it("sets the text fields to today's date", () => {
      const today = new Date()
      const todayString = new DateFormatter().format(today)
      expect(departureInput.element.value).toBe(todayString)
      expect(returnInput.element.value).toBe(todayString)
    })

    it('sets the text fields background to be white', () => {
      expect(departureInput.element.classList).toContain('bg-white')
      expect(returnInput.element.classList).toContain('bg-white')
    })

    it('sets the default dropdown to one-way', () => {
      expect(dropdown.element.value).toBe('one-way')
    })

    it('disables the return date input', () => {
      expect(returnInput.element.disabled).toBeTruthy()
    })

    it('does not display a message', () => {
      expect(form.find('p').exists()).toBeFalsy()
    })
  })

  describe('when the flight type is one-way', () => {
    beforeEach(async () => {
      await dropdown.setValue('one-way')
    })

    it('disables the return date input', () => {
      expect(returnInput.element.disabled).toBeTruthy()
    })

    describe('when the departure date is a valid date', () => {
      beforeEach(async () => {
        await departureInput.setValue('2024-07-03')
      })

      it('sets the background color to white', () => {
        expect(departureInput.element.classList).toContain('bg-white')
        expect(departureInput.element.classList).not.toContain('bg-red-500')
      })

      describe('when the form is submitted', () => {
        beforeEach(() => {
          form.trigger('submit')
        })

        it('displays a message', () => {
          expect(wrapper.get('p').text()).toEqual('You have booked a one-way flight on 2024-07-03.')
        })
      })
    })

    describe('when the departure date is an invalid date', () => {
      beforeEach(async () => {
        await departureInput.setValue('invalid date')
      })

      it('disables the submit button', () => {
        expect(form.get('button').element.disabled).toBeTruthy()
      })

      it('sets the background color to red', () => {
        expect(departureInput.element.classList).toContain('bg-red-500')
        expect(departureInput.element.classList).not.toContain('bg-white')
      })
    })
  })

  describe('when the flight type is return', () => {
    beforeEach(async () => {
      await dropdown.setValue('return')
      await departureInput.setValue('2024-07-03')
    })

    it('enables the return date input', () => {
      expect(returnInput.element.disabled).toBeFalsy()
    })

    describe('when the return date is a valid date', () => {
      beforeEach(async () => {
        await returnInput.setValue('2024-07-03')
      })

      it('sets the background color to white', () => {
        expect(returnInput.element.classList).toContain('bg-white')
        expect(returnInput.element.classList).not.toContain('bg-red-500')
      })

      describe('when the form is submitted', () => {
        beforeEach(() => {
          form.trigger('submit')
        })

        it('displays a message', () => {
          expect(wrapper.get('p').text()).toEqual('You have booked a return flight on 2024-07-03.')
        })
      })
    })

    describe('when the return date is an invalid date', () => {
      beforeEach(async () => {
        await returnInput.setValue('invalid date')
      })

      it('disables the submit button', () => {
        expect(form.get('button').element.disabled).toBeTruthy()
      })

      it('sets the background color to red', () => {
        expect(returnInput.element.classList).toContain('bg-red-500')
        expect(returnInput.element.classList).not.toContain('bg-white')
      })
    })

    describe('when the return date is before the departure date', () => {
      beforeEach(async () => {
        await returnInput.setValue('2024-07-02')
      })

      it('disables the submit button', () => {
        expect(form.get('button').element.disabled).toBeTruthy()
      })

      it('sets the background color to red', () => {
        expect(returnInput.element.classList).toContain('bg-red-500')
        expect(returnInput.element.classList).not.toContain('bg-white')
      })
    })
  })
})
