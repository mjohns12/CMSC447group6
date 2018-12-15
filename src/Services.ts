import { FirstResponder, ResponderStatusType } from '@/interfaces/FirstResponder';
import { Mission } from '@/interfaces/Mission';
import { Event, EventStatusType } from '@/interfaces/Event';
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
  public async createMission(): Promise<{ id: number }> {
    const response = await instance.get('createMission/');
    return response.data;
  }

  /* Creates a new Event in the database, given the parameters */
  public async createEvent(event: any): Promise<void> {
    const response = await instance.get('createEvent/', {
      params: event
    });
  }

  /* Gets all the unassigned first responders in the database */
  public async createResponder(responder: any): Promise<void> {
    const response = await instance.get('createFirstResponder/', {
      params: responder
    });
  }

  /* Gets all the equipment types in the database */
  public async createEquipment(equipment: any): Promise<void> {
    const response = await instance.get('createEquipment/', {
      params: equipment
    });
  }

  /* Adds a new status to the event that makes it associated to a mission */
  public async addEventToMission(event: Event, missionId: number): Promise<void> {
    const response = await instance.get('createEventStatus/' + event.id + '/', {
      params: {
        status: 'Pending',
        mission_id: missionId
      }
    });
  }

  /* Adds a new status to the responder that associates it with this mission */
  public async addResponderToMission(responder: FirstResponder, missionId: number): Promise<void> {
    const response = await instance.get('createFirstResponderStatus/' + responder.id + '/', {
      params: {
        status: 'Undecided',
        responder_id: responder.id,
        mission_id: missionId
      }
    });
  }

  /* Adds a new status to the event that isn't associated to a mission */
  public async removeEventFromMission(event: Event): Promise<void> {
    const response = await instance.get('createEventStatus/' + event.id + '/', {
      params: {
        status: 'Unassigned'
      }
    });
  }

  /* Adds a new status to the responder that isn't associated to a mission */
  public async removeResponderFromMission(responder: FirstResponder): Promise<void> {
    const response = await instance.get('createFirstResponderStatus/' + responder.id + '/', {
      params: {
        status: 'Unassigned',
        responder_id: responder.id
      }
    });
  }

  /* Changes the priority of the given event to the number given, should fail if it's not between 1-10 */
  public async changePriority(event: Event, priority: number): Promise<void> {
    const response = await instance.get('changeEventPriority/' + event.id + '/', {
      params: {
        priority
      }
    });
  }

  public async issueEquipmentToEvent(event: Event, equip: Equipment, quantity: number): Promise<void> {
    const response = await instance.get('issueEquipmentToEvent/' + event.id + '/', {
      params: {
        equipment_id: equip.id,
        quantity
      }
    });
  }

  public async requireEquipmentForEvent(event: Event, equipmentId: number, quantity: number): Promise<void> {
    const response = await instance.get('requireEquipmentForEvent/' + event.id + '/', {
      params: {
        equipment_id: equipmentId,
        quantity
      }
    });
  }

  /* If an event is given, assign the first responder to it, otherwise unassign the first responder from their event */
  public async assignResponder(
          eventId: number | null,
          responder: FirstResponder,
          missionId: number | null): Promise<string> {

    let status = '';
    if (!missionId) {
      status = 'Unassigned';
    } else if (!eventId) {
      status = 'Undecided';
    } else {
      status = 'Attending';
    }
    const response = await instance.get('createFirstResponderStatus/' + responder.id + '/', {
      params: {
        status,
        responder_id: responder.id,
        mission_id: missionId,
        event_id: eventId
      },
      responseType: 'text'
    });
    return response.data;
  }

  public async createEventTicket(ticket: object, event: Event) {
    const response = await instance.get('createEventTicket/' + event.id + '/', {
      params: ticket
    });
  }

  public async resolveTicket(ticket: any) {
    const response = await instance.get('changeTicketStatus/' + ticket.id + '/', {
      params: {
        newStatus: 'Resolved'
      }
    });
  }
}
