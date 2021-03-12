class AbstractBaseDataStore {
    constructor() {
        if (this.constructor === AbstractBaseDataStore) {
            throw new TypeError(
                'Abstract class "AbstractBaseDataStore" cannot be instantiated directly.'
            );
        }

        const abstractMethodNames = [
            "getAllDocuments",
            "insert",
            "update",
            "saveCollection",
        ];

        abstractMethodNames.forEach((methodName) => {
            if (this[methodName] === undefined) {
                throw new TypeError(
                    `Abstract method ${methodName} not implemented`
                );
            }
        });
    }
}

export { AbstractBaseDataStore };
