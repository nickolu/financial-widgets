import { BankHistory } from "./BankHistory.js";
import BANK_RECORDS from "../data/bankRecords.json";
import { BankRecord } from "./bankRecord.js";
import {
    mockLocalStorageDataStoreFunctions,
} from "../data-store/LocalStorageDataStore.js";
jest.mock("../data-store/LocalStorageDataStore.js");

describe("BankHistory", () => {
    it("should initialize with the correct amount of records", () => {
        const bankHistory = new BankHistory(BANK_RECORDS);
        expect(bankHistory.records.length).toEqual(BANK_RECORDS.length);
    });
    it("should add a record to the data store", () => {
        const bankHistory = new BankHistory(BANK_RECORDS);
        const record = BankRecord.createNew({
            description: "hello",
            amount: 100,
        });
        bankHistory.addRecord(record);
        expect(bankHistory.records.length).toEqual(BANK_RECORDS.length + 1);
    });
    it("should attach the provided methods as class members", () => {
        const bankHistory = new BankHistory(BANK_RECORDS);
        const mockReactStateValue = "some value";
        const mockReactStateSetter = jest.fn();
        bankHistory.bindReactState(mockReactStateValue, mockReactStateSetter);

        expect(bankHistory.reactStateValue).toBe(mockReactStateValue);
        expect(bankHistory.reactStateSetter).toBe(mockReactStateSetter);
    });

    it("should get accurate transaction summary results", () => {
        const initialBankHistory = [
            { description: "hello world", amount: 100, date: new Date() },
            { description: "hello world 2", amount: 200, date: new Date() },
        ];
        const bankHistory = new BankHistory(initialBankHistory);

        expect(bankHistory.getTransactionSummary()).toEqual({
            totalRecords: initialBankHistory.length,
            totalAmount: 300,
        });
    });

    it("should find the correct record", () => {
        const bankHistory = new BankHistory(BANK_RECORDS);
        const newRecord = BankRecord.createNew({
            description: "hello",
            amount: 100,
        });
        bankHistory.addRecord(newRecord);
        expect(bankHistory.findRecordById(newRecord.id)).toEqual(newRecord);
    });

    it("should update the given record", () => {
        const bankHistory = new BankHistory(BANK_RECORDS);
        const newRecord = BankRecord.createNew({
            description: "hello",
            amount: 100,
        });
        bankHistory.addRecord(newRecord);
        const newDescription = "foobar";
        const newDocument = {
            ...newRecord.document,
            description: newDescription,
        };
        bankHistory.updateRecord(newDocument);
        expect(mockLocalStorageDataStoreFunctions.update).toHaveBeenCalledWith(newDocument);
        expect(bankHistory.findRecordById(newRecord.id).description).toEqual(
            newDescription
        );
    });
});
