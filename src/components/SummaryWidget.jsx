import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { getLocalStorageRecords } from "../records-api.js";
import { currencyLocalization } from "../utils/currencyLocalization.js";

const NUMBER_OF_DAYS_OF_HISTORY_TO_USE = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const VALUE_THRESHOLD = 1000;

const isRecordOlderThanNumberOfDays = (record) => {
    const recordDate = new Date(record.date);
    const today = new Date();
    const daysPassed = (today.getTime() - recordDate.getTime()) / MS_PER_DAY;

    return daysPassed > NUMBER_OF_DAYS_OF_HISTORY_TO_USE;
};

const getTransactionSummary = (bankHistory) => {
    return bankHistory.reduce(
        (accumulator, record) => {
            if (!isRecordOlderThanNumberOfDays(record)) {
                accumulator.totalAmount += Number(record.amount);
                accumulator.totalRecords += 1;
            }

            return accumulator;
        },
        { totalRecords: 0, totalAmount: 0 }
    );
};

const StyledTable = styled.table`
    td {
        border: 1px solid #fff;
    }
    .negative {
        color: red;
    }
    .positive {
        color: green;
    }
    .warning {
        color: yellow;
    }
`;

const getTotalValueClassName = (totalAmount) => {
    if (totalAmount > VALUE_THRESHOLD) {
        return "positive";
    }
    if (totalAmount < 0) {
        return "negative";
    }
    return "warning";
};

const SummaryWidget = ({ bankHistory, updateBankHistory }) => {
    const { totalRecords, totalAmount } = getTransactionSummary(bankHistory);

    return (
        <Fragment>
            <StyledTable>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                {bankHistory.map((record) => {
                    if (!isRecordOlderThanNumberOfDays(record)) {
                        return (
                            <tr>
                                <td>{record.id}</td>
                                <td>
                                    {new Date(record.date).toLocaleDateString(
                                        "en-US"
                                    )}
                                </td>
                                <td>{record.description}</td>
                                <td>{record.amount}</td>
                            </tr>
                        );
                    }
                    return null;
                })}
                <tr>
                    <td colSpan="3">Total Records: {totalRecords}</td>
                    <td className={getTotalValueClassName(totalAmount)}>
                        Total: {currencyLocalization(-100, "en-us")}
                    </td>
                </tr>
            </StyledTable>
            <TransactionForm updateBankHistory={updateBankHistory} />
        </Fragment>
    );
};

const getRecordById = (records, id) => {
    return records.find((record) => record.id === id);
};

const TransactionForm = ({ updateBankHistory }) => {
    const currentRecords = getLocalStorageRecords("bankHistory");
    const [id, setId] = useState(currentRecords[0].id);
    const [description, setDescription] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                const modifiedRecord = {
                    ...getRecordById(currentRecords, id),
                    description: description,
                };

                updateBankHistory(modifiedRecord);
            }}
        >
            <label for="id">ID</label>
            <select
                onChange={(e) => {
                    setId(e.target.value);
                }}
            >
                {currentRecords.map((record) => {
                    return (
                        <option key={record.id} selected={record.id === id}>
                            {record.id}
                        </option>
                    );
                })}
            </select>
            <label for="description">Description</label>
            <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export { SummaryWidget };
