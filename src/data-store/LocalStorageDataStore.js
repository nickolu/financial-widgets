import { AbstractBaseDataStore } from "./AbstractBaseDataStore";

export class LocalStorageDataStore extends AbstractBaseDataStore {
    constructor(name) {
        super();
        this.name = name;
    }

    static getDataStore(name) {
        return new LocalStorageDataStore(name);
    }

    getAllDocuments() {
        return JSON.parse(localStorage.getItem(this.name));
    }

    initializeDataStore(documents) {
        if (localStorage.getItem(this.name)) {
            return;
        }

        this.saveCollection(documents);
    }

    insert(document) {
        const documents = this.getAllDocuments();
        documents.push(document);
        this.saveCollection(documents);
    }

    saveCollection(documents) {
        localStorage.setItem(this.name, JSON.stringify(documents));
    }

    update(newDocument) {
        const documents = this.getAllDocuments();

        documents.forEach((document, i) => {
            if (document.id === newDocument.id) {
                documents[i] = newDocument;
            }
        });

        this.saveCollection(documents);
    }
}
