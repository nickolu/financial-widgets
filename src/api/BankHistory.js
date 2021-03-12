import { BaseEntity } from "./BaseEntity.js";
import { BankRecord } from "./BankRecord.js";
import { BANK_HISTORY_LOCAL_STORAGE_NAME } from "../constants.js";
import BANK_RECORDS from "../data/bankRecords.json";
import { LocalStorageDataStore } from "../data-store/LocalStorageDataStore.js";

class BankHistory extends BaseEntity {
    constructor(initialBankHistoryRecords) {
        super();
        this.reactStateValue = () => {};
        this.reactStateSetter = () => {};
        this.dataStore = LocalStorageDataStore.getDataStore(
            BANK_HISTORY_LOCAL_STORAGE_NAME
        );

        const localStorageRecords = this.dataStore.getAllDocuments();

        if (localStorageRecords && localStorageRecords.length > 0) {
            initialBankHistoryRecords = localStorageRecords;
        }

        this.bankRecords = initialBankHistoryRecords.map(
            (document) => new BankRecord(document)
        );

        this.documents = this.bankRecords.map((record) => record.document);

        this.dataStore.initializeDataStore(this.documents);

        return this;
    }

    get records() {
        return this.bankRecords;
    }

    addRecord(record) {
        this.records.push(record);
        this.dataStore.insert(record.document);
        this.reactStateSetter(record.document);
    }

    bindReactState(reactStateValue, reactStateSetter) {
        this.reactStateValue = reactStateValue;
        this.reactStateSetter = reactStateSetter;
    }

    findRecordById(id) {
        return this.records.find((record) => id === record.id);
    }

    getTransactionSummary(sinceNumberOfDays = 30) {
        return this.records.reduce(
            (accumulator, record) => {
                if (!record.isOlderThanNumberOfDays(sinceNumberOfDays)) {
                    accumulator.totalAmount += Number(record.amount);
                    accumulator.totalRecords += 1;
                }
                return accumulator;
            },
            { totalRecords: 0, totalAmount: 0 }
        );
    }

    updateRecord(document) {
        const record = this.findRecordById(document.id);

        if (record) {
            record.update(document);
            this.reactStateSetter(document);
        }
    }
}

export { BankHistory };
