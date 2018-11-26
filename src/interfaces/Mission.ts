import { Event } from './Event';
import { FirstResponder } from './FirstResponder';
import { Equipment } from './Equipment';

export class Mission {
    constructor(
        public id: number,
        public events: Event[],
        public firstResponders: FirstResponder[],
        public equipment: Equipment[]
    ) { }
}
