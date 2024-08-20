import type {Person, PersonsRepository} from "@/components/crud/PersonsRepository";

export default class HTTPPersonsRepository implements PersonsRepository {
  private baseUrl = "http://localhost:3000/persons"

  async getAll(): Promise<Person[]> {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async create(name: string, surname: string): Promise<Person> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, surname})
    })
    return await response.json();
  }

  async update(person: Person, name: string, surname: string): Promise<Person> {
    const response = await fetch(this.baseUrl + `/${person.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, surname})
    })
    return await response.json();
  }

  async delete(person: Person): Promise<void> {
    const response = await fetch(this.baseUrl + `/${person.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await response.json();
  }
}
