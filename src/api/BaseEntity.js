import { v4 as uuidv4 } from "uuid";

export class BaseEntity {
    constructor(document = {}) {
        this.document = document;
        this.document.id = document.id || uuidv4();
    }
    get id() {
        return this.document.id;
    }
}
