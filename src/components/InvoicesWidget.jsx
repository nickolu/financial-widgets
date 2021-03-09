import React, { useState, useEffect } from "react";
import {
    insertLocalStorageRecord,
    getLocalStorageRecords,
} from "../records-api.js";

const InvoicesWidget = () => {
    const { totalInvoices, setTotalInvoices } = useState(
        getLocalStorageRecords("invoices").length
    );

    return (
        <div>
            <form
                onSubmit={async () => {
                    setTotalInvoices(getLocalStorageRecords("invoices").length);
                }}
            >
                <p>totalInvoices: {totalInvoices}</p>
                <CreateInvoice />
            </form>
        </div>
    );
};

const CreateInvoice = () => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [status, setStatus] = useState("");
    const [timesSubmitted, setTimesSubmitted] = useState(0);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                insertLocalStorageRecord("invoices", {
                    date: new Date(),
                    description: description,
                    id: id,
                    amount: amount,
                    transactionId: transactionId,
                    status: "NOT PAID",
                });
                setTimesSubmitted(timesSubmitted + 1);
            }}
        >
            <label for="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                }}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export { InvoicesWidget };
