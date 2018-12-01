
export class FirstResponder {
    constructor(
            public id: number,
            public phoneNumber: number,
            public firstName: string,
            public lastName: string,
            public branchName: string,
            public email: string,
            public occupation: Occupation,
            public statuses: ResponderStatus[],
            public assignedMissionID?: number) { }

    public getName() {
        return this.firstName + ' ' + this.lastName;
    }
}

export interface ResponderStatus {
    time: Date;
    status: ResponderStatusType;
    /* param eventid: unique ID of the currently assigned event */
    eventid?: number;
}

export enum ResponderStatusType {
    unassigned = 'Unassigned',
    undecided = 'Undecided',
    attending = 'Attending',
    working = 'Working'
}

export enum Occupation {
    Fire = 'Fire',
    Police = 'Police',
    Medical = 'Medical',
    Other = 'Other'
}
