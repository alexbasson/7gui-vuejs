import {describe, beforeEach, it, expect} from 'vitest'
import {LocalPersonsRepository} from './LocalPersonsRepository'

describe('PersonsRepository', () => {
  let repository: LocalPersonsRepository

  beforeEach(() => {
    repository = new LocalPersonsRepository()
  })

  it('manages CRUD operations on a collection of persons', async () => {
    expect(await repository.getAll()).toEqual([])

    const alice = await repository.create('Alice', 'Awesome')
    expect(await repository.getAll()).toEqual([alice])

    const bob = await repository.create('Bob', 'Builder')
    expect(await repository.getAll()).toEqual([alice, bob])

    const clara = await repository.create('Clara', 'Creative')
    expect(await repository.getAll()).toEqual([alice, bob, clara])

    const dan = await repository.create('Dan', 'DeMan')
    expect(await repository.getAll()).toEqual([alice, bob, clara, dan])

    const carla = await repository.update(clara, 'Carla', 'Contemporary')
    expect(await repository.getAll()).toContain(carla)
    expect(carla.id).toEqual(3)
    expect(carla.name).toEqual('Carla')
    expect(carla.surname).toEqual('Contemporary')

    repository.delete(bob)
    expect(await repository.getAll()).toEqual([alice, clara, dan])
  })
})
