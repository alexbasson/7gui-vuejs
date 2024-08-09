export type Person = {
  id: number,
  name: string,
  surname: string,
}

export interface PersonsRepository {
  getAll(): Promise<Person[]>;
  createPerson(name: string, surname: string): Promise<Person>;
  update(person: Person, name: string, surname: string): Promise<Person>;
  delete(person: Person): Promise<void>;
}
