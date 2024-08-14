import type {Person, PersonsRepository} from "@/components/crud/PersonsRepository";

export class LocalPersonsRepository implements PersonsRepository {
  private id: number = 1
  private persons: Person[] = []

  async getAll(): Promise<Person[]> {
    return new Promise((resolve) => {
      resolve(this.persons)
    })
  }

  async create(name: string, surname: string): Promise<Person> {
    return new Promise((resolve) => {
      const newPerson: Person = {id: this.id, name, surname}
      this.persons.push(newPerson)
      this.id++
      resolve(newPerson)
    })
  }

  async update(person: Person, name: string, surname: string): Promise<Person> {
    return new Promise((resolve) => {
      const personToUpdate = this.persons.find(p => p.id === person.id)
      if (personToUpdate) {
        personToUpdate.name = name
        personToUpdate.surname = surname
        this.persons.splice(this.indexOf(person), 1, personToUpdate)
      }
      resolve(person)
    })
  }

  async delete(person: Person): Promise<void> {
    return new Promise((resolve) => {
      this.persons.splice(this.indexOf(person), 1)
      resolve()
    })
  }

  private indexOf(person: Person): number {
    return this.persons.findIndex(p => p.id === person.id)
  }
}
