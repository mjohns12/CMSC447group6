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
        public equipmentNeeded: Equipment[],
        public statuses: EventStatus[]
    ) { }
}

interface EventStatus {
    time: Date;
    status: EventStatusType;
}

enum EventStatusType {
    pending,
    started,
    aborted,
    finished
}
