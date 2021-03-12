const mockFunctions = {
    update: jest.fn(),
    getAllDocuments: jest.fn(),
    initializeDataStore: jest.fn(),
    insert: jest.fn(),
};

class LocalStorageDataStore {
    static getDataStore() {
        return new LocalStorageDataStore();
    }
    getAllDocuments = mockFunctions.getAllDocuments;
    initializeDataStore = mockFunctions.initializeDataStore;
    insert = mockFunctions.insert;
    update = mockFunctions.update;
}

export {
    LocalStorageDataStore,
    mockFunctions as mockLocalStorageDataStoreFunctions,
};
