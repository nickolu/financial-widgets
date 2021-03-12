import React, { Fragment } from "react";
import { currencyLocalization } from "../../utils/currencyLocalization.js";
import { SummaryTable } from "./BankHistory.Styles.jsx";

const VALUE_THRESHOLD = 100;

const getTotalValueClassName = (totalAmount) => {
    if (totalAmount > VALUE_THRESHOLD) {
        return "positive";
    }
    if (totalAmount < 0) {
        return "negative";
    }
    return "warning";
};

const BankHistorySummary = ({ bankHistory }) => {
    const { totalRecords, totalAmount } = bankHistory.getTransactionSummary();

    return (
        <Fragment>
            <SummaryTable>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bankHistory.records.map((record) => {
                        return (
                            <tr key={record.id}>
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
                    })}
                    <tr>
                        <td colSpan="3">Total Records: {totalRecords}</td>
                        <td className={getTotalValueClassName(totalAmount)}>
                            Total: {currencyLocalization(totalAmount, "en-us")}
                        </td>
                    </tr>
                </tbody>
            </SummaryTable>
        </Fragment>
    );
};

export { BankHistorySummary };
