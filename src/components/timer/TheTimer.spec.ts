import { describe, beforeEach, it, expect } from 'vitest'
import { mount, DOMWrapper, VueWrapper } from '@vue/test-utils'
import TheTimer from "@/components/timer/TheTimer.vue";
import {type Timer} from "@/components/timer/timer";

describe('TheTimer', () => {
  let wrapper: VueWrapper
  let progressBar: DOMWrapper<HTMLElement>
  let durationLabel: DOMWrapper<HTMLElement>
  let elapsedLabel: DOMWrapper<HTMLElement>
  let durationSlider: DOMWrapper<HTMLInputElement>
  let resetButton: DOMWrapper<HTMLButtonElement>

  let mockTimer: MockTimer

  const defaultDuration = 1000
  const interval = 100

  beforeEach(() => {
    mockTimer = new MockTimer()

    wrapper = mount(TheTimer, {
      props: {
        interval: interval,
        defaultDuration: defaultDuration,
        timer: mockTimer,
      }
    })

    progressBar = wrapper.find("[id='progress-bar']")
    durationLabel = wrapper.find("[data-testid='duration']")
    elapsedLabel = wrapper.find("[data-testid='elapsed-time']")
    durationSlider = wrapper.find("input[type='range']")
    resetButton = wrapper.find('button')
  })

  describe('upon initialization', () => {
    it('sets the initial duration to the defaultDuration seconds', () => {
      expect(durationLabel.text()).toContain('1.0s')
      const sliderAttributes = durationSlider.element.attributes
      expect(sliderAttributes.getNamedItem('min')?.value).toBe('0')
      expect(sliderAttributes.getNamedItem('max')?.value).toBe('60000')
      expect(durationSlider.element.value).toEqual(`${defaultDuration}`)
    })

    it('sets the elapsed time to zero', () => {
      expect(elapsedLabel.text()).toContain('0.0s')
    })

    it("sets the progress bar's width to 0%", () => {
      expect(progressBar.element.style.width).toBe('0%')
    })
  })

  describe('when the timer increments the interval', () => {
    it('updates the elapsed time', async () => {
      await mockTimer.tickInterval(10)

      expect(elapsedLabel.text()).toContain('1.0s')
    })

    it('updates the progress bar', async () => {
      await mockTimer.tickInterval(2)
      expect(progressBar.element.style.width).toBe('20%')

      await mockTimer.tickInterval(4)
      expect(progressBar.element.style.width).toBe('60%')

      await mockTimer.tickInterval(3)
      expect(progressBar.element.style.width).toBe('90%')

      await mockTimer.tickInterval(1)
      expect(progressBar.element.style.width).toBe('100%')
    })
  })

  describe('when the elapsed time reaches the set duration', () => {
    it('stops updating the elapsed time', async () => {
      expect(progressBar.element.style.width).toBe('0%')

      await mockTimer.tickInterval(5)
      expect(progressBar.element.style.width).toBe('50%')

      await mockTimer.tickInterval(5)
      expect(progressBar.element.style.width).toBe('100%')

      await mockTimer.tickInterval(1)
      expect(progressBar.element.style.width).toBe('100%')
    })
  })

  describe('when the user changes the duration slider', () => {
    beforeEach(async () => {
      await mockTimer.tickInterval(5)
      expect(progressBar.element.style.width).toBe('50%')
      expect(elapsedLabel.text()).toContain('0.5s')
    })

    it('updates the duration label', async () => {
      await durationSlider.setValue('5000')

      expect(durationLabel.text()).toContain('5.0s')
    })

    it('updates the progress bar', async () => {
      await durationSlider.setValue('5000')

      expect(progressBar.element.style.width).toBe('10%')
    })
  })

  describe("when the user clicks the 'reset' button", () => {
    beforeEach(async () => {
      await mockTimer.tickInterval(5)
      expect(progressBar.element.style.width).toBe('50%')
      expect(elapsedLabel.text()).toContain('0.5s')

      await resetButton.trigger('click')
    })

    it('resets the elapsed time to zero', () => {
      expect(elapsedLabel.text()).toContain('0.0s')
    })

    it('resets the progress bar', () => {
      expect(progressBar.element.style.width).toBe('0%')
    })
  })
})

class MockTimer implements Timer {
  private handler: Function = () => {}

  setInterval(handler: Function, timeout?: number): number {
    this.handler = handler
    return 0
  }

  tickInterval(times: number = 1): Promise<void> {
    return new Promise<void>((resolve) => {
      for (let i = 0; i < times; i++) {
        this.handler()
      }
      resolve()
    })
  }
}
