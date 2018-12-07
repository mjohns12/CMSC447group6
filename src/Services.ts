import { FirstResponder } from '@/interfaces/FirstResponder';
import { Mission } from '@/interfaces/Mission';
import { Event } from '@/interfaces/Event';
import { Equipment } from '@/interfaces/Equipment';

export class Service {

  /* Given responder id, gets its database entry */
  public async getResponder(id: number): Promise<FirstResponder> {
    return require('./test_files/assigned_responders.json')
      .find((r: FirstResponder) => {
        return r.id === id;
    });
  }

  /* Given mission id, gets the mission and its data */
  public async getMission(id: number): Promise<Mission> {
    return require('./test_files/missions.json')
      .find((r: Mission) => {
        return r.id === id;
    });
  }

  /* Gets all the events not marked completed in the database */
  public async getMissions(): Promise<Mission[]> {
    return require('./test_files/missions.json');
  }

  /* Gets all the unassigned events in the database */
  public async getUnassignedEvents(): Promise<Event[]> {
    return require('./test_files/unassigned_events.json');
  }

  /* Gets all the unassigned first responders in the database */
  public async getUnassignedResponders(): Promise<FirstResponder[]> {
    return require('./test_files/unassigned_responders.json');
  }

  /* Gets all the equipment that has a quantity higher than the number currently in use by missions in the database */
  public async getUnassignedEquipment(): Promise<Equipment[]> {
    return require('./test_files/unassigned_equipment.json');
  }

  /* Adds a new status to the event that makes it associated to a mission */
  public async addEventToMission(event: Event, mission: Mission): Promise<void> {
    alert(`Add the part that adds event #${event.id} to the mission.`);
  }

  /* Adds a new status to the responder that associates it with this mission */
  public async addResponderToMission(responder: FirstResponder, mission: Mission): Promise<void> {
    alert(`Add the part that adds responder #${responder.id} to the mission.`);
  }

  /* Adds the equipment quantity to the mission */
  public async addEquipmentToMission(equip: Equipment, equipmentNum: number, mission: Mission): Promise<void> {
    alert(`Add the part that adds equipment #${equip.id} to the mission.`);
  }

  /* Adds a new status to the event that isn't associated to a mission */
  public async removeEventFromMission(event: Event): Promise<void> {
    alert(`Add the part that removes event #${event.id} from the mission.`);
  }

  /* Adds a new status to the responder that isn't associated to a mission */
  public async removeResponderFromMission(responder: FirstResponder): Promise<void> {
    alert(`Add the part that removes responder #${responder.id} from the mission.`);
  }

  /* Removes the given number of equipment from the mission, no number removes all of it */
  public async removeEquipmentFromMission(equip: Equipment, equipmentNum?: number): Promise<void> {
    alert(`Add the part that removes equipment #${equip.id} from the mission.`);
  }

  /* Changes the priority of the given event to the number given, should fail if it's not between 1-10 */
  public async changePriority(event: Event, priority: number): Promise<void> {
    alert(`Add the part that changes the priority of event #${event.id} to ${priority}.`);
  }

}
