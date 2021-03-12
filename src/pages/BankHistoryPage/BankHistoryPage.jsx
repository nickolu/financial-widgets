import React, { useState } from "react";
import { Container } from "reactstrap";
import { BankHistory } from "../../api/BankHistory.js";
import { BankHistorySummary } from "./BankHistorySummary";
import BANK_RECORDS from "../../data/bankRecords.json";
import { EditTransactionForm } from "./EditTransactionForm.jsx";
import { CreateTransactionForm } from "./CreateTransactionForm.jsx";

const BankHistoryPage = () => {
    const bankHistory = new BankHistory(BANK_RECORDS);
    const [bankHistoryRecords, setBankHistoryRecords] = useState(
        bankHistory.records
    );

    bankHistory.bindReactState(bankHistoryRecords, setBankHistoryRecords);

    return (
        <Container>
            <h2>Bank History Summary</h2>
            <BankHistorySummary bankHistory={bankHistory} />

            <h2>Edit a Bank Transaction</h2>
            <EditTransactionForm bankHistory={bankHistory} />

            <h2>Create a New Transaction</h2>
            <CreateTransactionForm bankHistory={bankHistory} />
        </Container>
    );
};

export { BankHistoryPage };
