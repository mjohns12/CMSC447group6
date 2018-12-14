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
        public lat: number,
        public lon: number
    ) { }
}

export interface EventStatus {
    time: Date;
    status: EventStatusType;
}

export enum EventStatusType {
    pending = 'Pending',
    started = 'Started',
    aborted = 'Aborted',
    finished = 'Finished'
}
