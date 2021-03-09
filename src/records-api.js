export function initializeLocalStorage(name, jsonData) {
    if (localStorage.getItem(name)) {
        return;
    }

    localStorage.setItem(name, JSON.stringify(jsonData));
}

export function updateLocalStorageRecord(collectionName, id, newRecord) {
    const records = JSON.parse(localStorage.getItem(collectionName));

    records.forEach((record, i) => {
        if (record.id === id) {
            records[i] = newRecord;
        }
    });

    localStorage.setItem(collectionName, JSON.stringify(records));
}

export function insertLocalStorageRecord(collectionName, data) {
    const records = JSON.parse(localStorage.getItem(collectionName));

    records.push(data);

    localStorage.setItem(collectionName, JSON.stringify(records));
}

export function getLocalStorageRecords(collectionName) {
    return JSON.parse(localStorage.getItem(collectionName));
}
