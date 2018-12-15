import { Equipment } from './Equipment';

export class Event {
  constructor(
    public id: number,
    public fName: string,
    public lName: string,
    public streetNum: number,
    public street: string,
    public city: string,
    public state: string,
    public zipCode: number,
    public phoneNum: number,
    public timeCalledIn: Date,
    public description: string,
    public priority: number,
    public equipment: Equipment[],
    public statuses: EventStatus[],
    public tickets: EventTicket[],
    public lat: number,
    public lon: number
  ) { }
}

export interface EventStatus {
  time: Date;
  status: EventStatusType;
}

export enum EventStatusType {
  unassigned = 'Unassigned',
  pending = 'Pending',
  started = 'Started',
  aborted = 'Aborted',
  finished = 'Finished'
}

export interface EventTicket {
  ticketStatus: EventTicketStatus;
  ticketType: EventTicketType;
  ticketDescription: string;
}

export enum EventTicketStatus {
  unresolved = 'Unresolved',
  resolved = 'Resolved'
}

export enum EventTicketType {
  priority = 'Priority',
  responder = 'First Responder',
  equipment = 'Equipment'
}
