export type Person = {
  id: number,
  name: string,
  surname: string,
}

export class PersonsRepository {
  private id: number = 1
  private persons: Person[] = []

  getAll(): Person[] {
    return this.persons
  }

  createPerson(name: string, surname: string): Person {
    const newPerson: Person = {id: this.id, name, surname}
    this.persons.push(newPerson)
    this.id++
    return newPerson
  }

  update(person: Person, name: string, surname: string): Person {
    const personToUpdate = this.persons.find(p => p.id === person.id)
    if (personToUpdate) {
      personToUpdate.name = name
      personToUpdate.surname = surname
      this.persons.splice(this.indexOf(person), 1, personToUpdate)
    }
    return person
  }

  delete(person: Person): boolean {
    this.persons.splice(this.indexOf(person), 1)
    return true
  }

  private indexOf(person: Person): number {
    return this.persons.findIndex(p => p.id === person.id)
  }
}
