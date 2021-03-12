import { BANK_HISTORY_LOCAL_STORAGE_NAME } from "../constants.js";
import { BaseEntity } from "./BaseEntity.js";
import { updateLocalStorageRecord } from "./localStorage.js";

const DEFAULT_NUMBER_OF_DAYS = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export class BankRecord extends BaseEntity {
    static createNew({ description = "", amount = 0 }) {
        const document = {
            id: this.id,
            date: new Date(),
            description: description,
            amount: amount,
        };
        return new BankRecord(document);
    }
    get date() {
        return this.document.date;
    }
    get description() {
        return this.document.description;
    }
    get amount() {
        return this.document.amount;
    }

    isOlderThanNumberOfDays(numberOfDays = DEFAULT_NUMBER_OF_DAYS) {
        const recordDate = new Date(this.date);
        const today = new Date();
        const daysPassed =
            (today.getTime() - recordDate.getTime()) / MS_PER_DAY;

        return daysPassed > numberOfDays;
    }

    update(recordJson) {
        this.document = { ...this.document, ...recordJson };
        updateLocalStorageRecord(
            BANK_HISTORY_LOCAL_STORAGE_NAME,
            this.id,
            this.document
        );
    }
}
