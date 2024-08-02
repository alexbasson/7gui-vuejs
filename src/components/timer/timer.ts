export interface Timer {
  setInterval: (handler: Function, timeout?: number) => number
}

export class RealTimer implements Timer {
  setInterval(handler: Function, timeout?: number): number {
    return setInterval(handler, timeout)
  }
}
