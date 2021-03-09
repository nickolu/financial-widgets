import "./App.css";
import React, { useState } from "react";
import { SummaryWidget } from "./components/SummaryWidget.jsx";
import { InvoicesWidget } from "./components/InvoicesWidget.jsx";
import {
    initializeLocalStorage,
    getLocalStorageRecords,
    updateLocalStorageRecord,
} from "./records-api.js";
import BANK_HISTORY from "./bank-history.json";
import INVOICES from "./invoices.json";

function App() {
    initializeLocalStorage("bankHistory", BANK_HISTORY);
    initializeLocalStorage("invoices", INVOICES);

    const [bankHistory, setBankHistory] = useState(
        getLocalStorageRecords("bankHistory")
    );
    const [invoices, setInvoices] = useState(
        getLocalStorageRecords("invoices")
    );

    const updateBankHistory = (record) => {
        updateLocalStorageRecord("bankHistory", record.id, record);
        const newBankHistory = getLocalStorageRecords("bankHistory");
        setBankHistory(newBankHistory);
    };

    return (
        <div className="App">
            <header className="App-header">
                <SummaryWidget
                    bankHistory={bankHistory}
                    updateBankHistory={updateBankHistory}
                />
                <InvoicesWidget invoices={getLocalStorageRecords("invoices")} />
            </header>
        </div>
    );
}

export default App;
