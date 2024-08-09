import { describe, beforeEach, it, expect } from 'vitest'
import {mount, DOMWrapper, VueWrapper} from "@vue/test-utils";
import CrudComponent from "@/components/crud/CrudComponent.vue";
import {LocalPersonsRepository} from "@/components/crud/LocalPersonsRepository";
import flushPromises from "flush-promises";

describe('CrudComponent', () => {
  let wrapper: VueWrapper
  let nameInput: DOMWrapper<HTMLInputElement>
  let surnameInput: DOMWrapper<HTMLInputElement>
  let personsElements: () => DOMWrapper<HTMLLIElement>[]
  let createButton: DOMWrapper<HTMLButtonElement>
  let updateButton: DOMWrapper<HTMLButtonElement>
  let deleteButton: DOMWrapper<HTMLButtonElement>
  let filterInput: DOMWrapper<HTMLInputElement>

  beforeEach(() => {
    wrapper = mount(CrudComponent, {
      props: {
        repository: new LocalPersonsRepository()
      }
    })

    nameInput = wrapper.find("input[name='name']")
    surnameInput = wrapper.find("input[name='surname']")
    personsElements = () => wrapper.findAll("li")
    createButton = wrapper.find("button[name='create']")
    updateButton = wrapper.find("button[name='update']")
    deleteButton = wrapper.find("button[name='delete']")
    filterInput = wrapper.find("input[name='filter']")
  })

  describe('upon initialization', () => {
    it('has an empty list of persons', () => {
      expect(personsElements().length).toBe(0)
    })
  })

  describe('when creating new persons', () => {
    it('adds the new persons to the list of persons', async () => {
      expect(personsElements().length).toBe(0)

      await createPerson('Alice', 'Awesome')
      expect(personsElements().length).toBe(1)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')

      await createPerson('Bob', 'Builder')
      expect(personsElements().length).toBe(2)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Bob Builder')
    })
  })

  describe('when selecting a person in the list', () => {
    it('sets the background color and text color of the selected list item', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')

      const aliceListItem = listItemForPerson('Alice Awesome')
      const bobListItem = listItemForPerson('Bob Builder')
      const claraListItem = listItemForPerson('Clara Creative')

      await bobListItem.trigger('click')

      expect(bobListItem.element.classList).toContain('bg-blue-500')
      expect(bobListItem.element.classList).toContain('text-white')

      expect(aliceListItem.element.classList).not.toContain('bg-blue-500')
      expect(aliceListItem.element.classList).not.toContain('text-white')
      expect(claraListItem.element.classList).not.toContain('bg-blue-500')
      expect(claraListItem.element.classList).not.toContain('text-white')
    })
  })

  describe('when updating a person in the list', () => {
    it('updates the selected person with the new name and surname', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')

      expect(personsElements().length).toBe(3)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Bob Builder')
      expect(personsElements()[2].text()).toEqual('Clara Creative')

      const bobListItem = listItemForPerson('Bob Builder')
      await bobListItem.trigger('click')

      await nameInput.setValue('Barb')
      await surnameInput.setValue('Beyer')

      await updateButton.trigger('click')
      await flushPromises()

      expect(personsElements().length).toBe(3)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Barb Beyer')
      expect(personsElements()[2].text()).toEqual('Clara Creative')
    })
  })

  describe('when deleting a person from the list', () => {
    it('updates the selected person with the new name and surname', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')

      expect(personsElements().length).toBe(3)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Bob Builder')
      expect(personsElements()[2].text()).toEqual('Clara Creative')

      const bobListItem = listItemForPerson('Bob Builder')
      await bobListItem.trigger('click')

      await deleteButton.trigger('click')
      await flushPromises()

      expect(personsElements().length).toBe(2)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Clara Creative')
    })
  })

  describe('filtering the list of persons', () => {
    it('updates the list of persons whose surnames match the filter', async () => {
      await createPerson('Alice', 'Awesome')
      await createPerson('Bob', 'Builder')
      await createPerson('Clara', 'Creative')
      await createPerson('Barb', 'Busy')

      expect(personsElements().length).toBe(4)
      expect(personsElements()[0].text()).toEqual('Alice Awesome')
      expect(personsElements()[1].text()).toEqual('Bob Builder')
      expect(personsElements()[2].text()).toEqual('Clara Creative')
      expect(personsElements()[3].text()).toEqual('Barb Busy')

      await filterInput.setValue('bu')

      expect(personsElements().length).toBe(2)
      expect(personsElements()[0].text()).toEqual('Bob Builder')
      expect(personsElements()[1].text()).toEqual('Barb Busy')
    })
  })

  const createPerson = async (name: string, surname: string) => {
    await nameInput.setValue(name)
    await surnameInput.setValue(surname)
    await createButton.trigger('click')
    await flushPromises()
  }

  const listItemForPerson = (fullname: string): DOMWrapper<HTMLLIElement> => {
    return personsElements().find(element => element.text() === fullname)!
  }
})
