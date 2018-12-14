import { FirstResponder } from '@/interfaces/FirstResponder';
import { Mission } from '@/interfaces/Mission';
import { Event } from '@/interfaces/Event';
import { Equipment } from '@/interfaces/Equipment';
import axios from 'axios';

const URL = 'http://127.0.0.1:8000/polls/';
const instance = axios.create({
  baseURL: URL,
  timeout: 1000,
  responseType: 'json'
});

export class Service {

  /* Given responder id, gets its database entry */
  public async getResponder(id: number): Promise<FirstResponder> {
    const response = await instance.get('getFirstResponder/' + id + '/');
    return response.data;
  }

  /* Given mission id, gets the mission and its data */
  public async getMission(id: number): Promise<Mission> {
    const response = await instance.get('getMission/' + id + '/');
    return response.data;
  }

  /* Gets all the missions with incomplete events in the database */
  public async getMissions(): Promise<Mission[]> {
    const response = await instance.get('getAllMissions/');
    return response.data;
  }

  /* Gets all the unassigned events in the database */
  public async getUnassignedEvents(): Promise<Event[]> {
    const response = await instance.get('getUnassignedEvents/');
    return response.data;
  }

  /* Gets all the unassigned first responders in the database */
  public async getUnassignedResponders(): Promise<FirstResponder[]> {
    const response = await instance.get('getUnassignedFirstResponders/');
    return response.data;
  }

  /* Gets all the equipment types in the database */
  public async getAllEquipment(): Promise<Equipment[]> {
    const response = await instance.get('getAllEquipment/');
    return response.data;
  }

  /* Gets all the missions with incomplete events in the database */
  public async createMission(): Promise<void> {
    const response = await instance.get('get_missions');
    return response.data;
  }

  /* Gets all the unassigned events in the database */
  public async createEvent(event: Event): Promise<void> {
    const response = await instance.get('createEvent', {
      params: event
    });
  }

  /* Gets all the unassigned first responders in the database */
  public async createResponder(responder: any): Promise<void> {
    const response = await instance.get('createFirstResponder', {
      params: responder
    });
  }

  /* Gets all the equipment types in the database */
  public async createEquipment(equipment: Equipment): Promise<void> {
    const response = await instance.get('createEquipment', {
      params: equipment
    });
  }

  /* Adds a new status to the event that makes it associated to a mission */
  public async addEventToMission(event: Event, missionid: number): Promise<void> {
    alert(`Add the part that adds event #${event.id} to the mission.`);
  }

  /* Adds a new status to the responder that associates it with this mission */
  public async addResponderToMission(responder: FirstResponder, missionid: number): Promise<void> {
    alert(`Add the part that adds responder #${responder.id} to the mission.`);
  }

  /* Adds a new status to the event that isn't associated to a mission */
  public async removeEventFromMission(event: Event): Promise<void> {
    alert(`Add the part that removes event #${event.id} from the mission.`);
  }

  /* Adds a new status to the responder that isn't associated to a mission */
  public async removeResponderFromMission(responder: FirstResponder): Promise<void> {
    alert(`Add the part that removes responder #${responder.id} from the mission.`);
  }

  /* Changes the priority of the given event to the number given, should fail if it's not between 1-10 */
  public async changePriority(event: Event, priority: number): Promise<void> {
    alert(`Add the part that changes the priority of event #${event.id} to ${priority}.`);
  }

  public async issueEquipmentToEvent(event: Event, equip: Equipment, quantity: number): Promise<void> {
    alert(`Handle this`);
  }

  public async requireEquipmentForEvent(event: Event, equipid: number, quantity: number): Promise<void> {
    alert(`Handle this too`);
  }

  /* If an event is given, assign the first responder to it, otherwise unassign the first responder from their event */
  public async assignResponder(event: Event | null | undefined, responder: FirstResponder): Promise<void> {
    alert(`Assign first responder to mission/unassign first responder`);
  }

}
