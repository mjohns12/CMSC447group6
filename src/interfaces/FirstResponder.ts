import { Event } from './Event';

export class FirstResponder {
    constructor(
            public id: number,
            public phoneNumber: number,
            public firstName: string,
            public lastName: string,
            public branchName: string,
            public email: string,
            public assignedMissionID: number,
            public occupation: string,
            public statuses: ResponderStatus[]) { }

    public getName() {
        return this.firstName + ' ' + this.lastName;
    }
}

interface ResponderStatus {
    time: Date;
    status: ResponderStatusType;
    event: Event;
}

enum ResponderStatusType {
    unassigned,
    undecided,
    attending,
    working
}
