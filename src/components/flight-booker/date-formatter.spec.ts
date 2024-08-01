import { describe, beforeEach, it, expect } from 'vitest'
import DateFormatter from "@/components/flight-booker/date-formatter";

describe('DateFormatter', () => {
  let dateFormatter: DateFormatter

  beforeEach(() => {
    dateFormatter = new DateFormatter()
  })

  describe('when the date has single-digit months', () => {
    it('formats it with two-digits', () => {
      const date = new Date()
      date.setFullYear(2024)
      date.setMonth(1)
      date.setDate(20)

      expect(dateFormatter.format(date)).toEqual('2024-01-20')
    })
  })

  describe('when the date has double-digit months', () => {
    it('formats it with two-digits', () => {
      const date = new Date()
      date.setFullYear(2024)
      date.setMonth(10)
      date.setDate(20)

      expect(dateFormatter.format(date)).toEqual('2024-10-20')
    })
  })
})
