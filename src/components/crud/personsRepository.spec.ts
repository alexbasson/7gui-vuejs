import {describe, beforeEach, it, expect} from 'vitest'
import {PersonsRepository} from './personsRepository'

describe('PersonsRepository', () => {
  let repository: PersonsRepository

  beforeEach(() => {
    repository = new PersonsRepository()
  })

  it('manages CRUD operations on a collection of persons', () => {
    expect(repository.getAll()).toEqual([])

    const alice = repository.createPerson('Alice', 'Awesome')
    expect(repository.getAll()).toEqual([alice])

    const bob = repository.createPerson('Bob', 'Builder')
    expect(repository.getAll()).toEqual([alice, bob])

    const clara = repository.createPerson('Clara', 'Creative')
    expect(repository.getAll()).toEqual([alice, bob, clara])

    const dan = repository.createPerson('Dan', 'DeMan')
    expect(repository.getAll()).toEqual([alice, bob, clara, dan])

    const carla = repository.update(clara, 'Carla', 'Contemporary')
    expect(repository.getAll()).toContain(carla)
    expect(carla.id).toEqual(3)
    expect(carla.name).toEqual('Carla')
    expect(carla.surname).toEqual('Contemporary')

    repository.delete(bob)
    expect(repository.getAll()).toEqual([alice, clara, dan])
  })
})
