import { FirstResponder } from '@/interfaces/FirstResponder';
import { Mission } from '@/interfaces/Mission';
import { Event } from '@/interfaces/Event';
import { Equipment } from '@/interfaces/Equipment';

export class Service {

  public async getResponder(id: number): Promise<FirstResponder> {
    return require('./test_files/assigned_responders.json')
      .find((r: FirstResponder) => {
        return r.id === id;
    });
  }

  public async getMission(id: number): Promise<Mission> {
    return require('./test_files/missions.json')
      .find((r: Mission) => {
        return r.id === id;
    });
  }

  public async getMissions(): Promise<Mission[]> {
    return require('./test_files/missions.json');
  }

  public async getUnassignedEvents(): Promise<Event[]> {
    return require('./test_files/unassigned_events.json');
  }

  public async getUnassignedResponders(): Promise<FirstResponder[]> {
    return require('./test_files/unassigned_responders.json');
  }

  public async getUnassignedEquipment(): Promise<Equipment[]> {
    return require('./test_files/unassigned_equipment.json');
  }

}
