import {
    getLocalStorageRecords,
    initializeLocalStorage,
    insertLocalStorageRecord,
} from "./localStorage.js";
import { BaseEntity } from "./BaseEntity.js";
import { BankRecord } from "./BankRecord.js";
import { BANK_HISTORY_LOCAL_STORAGE_NAME } from "../constants.js";
import BANK_RECORDS from "../data/bankRecords.json";

class BankHistoryDataStore extends BaseEntity {
    constructor(initialBankHistoryRecords) {
        super();
        this.reactStateValue = () => {};
        this.reactStateSetter = () => {};
        const localStorageRecords = getLocalStorageRecords(
            BANK_HISTORY_LOCAL_STORAGE_NAME
        );

        if (localStorageRecords && localStorageRecords.length > 0) {
            initialBankHistoryRecords = localStorageRecords;
        }

        this.bankRecords = initialBankHistoryRecords.map(
            (record) => new BankRecord(record)
        );

        this.documents = this.bankRecords.map((record) => record.document);

        initializeLocalStorage(BANK_HISTORY_LOCAL_STORAGE_NAME, this.documents);

        return this;
    }

    get records() {
        return this.bankRecords;
    }

    addRecord(recordJson) {
        const newRecord = BankRecord.createNew(recordJson);
        this.records.push(newRecord);
        insertLocalStorageRecord(
            BANK_HISTORY_LOCAL_STORAGE_NAME,
            newRecord.document
        );
        this.reactStateSetter(recordJson);
    }

    bindReactState(reactStateValue, reactStateSetter) {
        this.reactStateValue = reactStateValue;
        this.reactStateSetter = reactStateSetter;
    }

    findRecordById(id) {
        console.log("finding record by id", id);
        return this.records.find((record) => id === record.id);
    }

    getTransactionSummary() {
        return this.records.reduce(
            (accumulator, record) => {
                if (!record.isOlderThanNumberOfDays(30)) {
                    accumulator.totalAmount += Number(record.amount);
                    accumulator.totalRecords += 1;
                }

                return accumulator;
            },
            { totalRecords: 0, totalAmount: 0 }
        );
    }

    updateRecord(recordJson) {
        console.log("updating record with document", recordJson);
        const record = this.findRecordById(recordJson.id);

        if (record) {
            record.update(recordJson);
            this.reactStateSetter(recordJson);
        }
    }
}

const bankHistory = new BankHistoryDataStore(BANK_RECORDS);
export { BankHistoryDataStore, bankHistory };
