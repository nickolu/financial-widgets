import React, { useState } from "react";
import { BankRecord } from "../../api/BankRecord.js";
import { Form, Label, Input, Button } from "reactstrap";
import { FinancialFormGroup } from "../../components/FinancialFormGroup";

const CreateTransactionForm = ({ bankHistory }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                const newRecord = BankRecord.createNew({ description, amount });

                bankHistory.addRecord(newRecord);
            }}
        >
            <FinancialFormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </FinancialFormGroup>
            <FinancialFormGroup>
                <Label htmlFor="amount">Amount</Label>
                <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                />
            </FinancialFormGroup>
            <FinancialFormGroup>
                <Button type="submit">Submit</Button>
            </FinancialFormGroup>
        </Form>
    );
};

export { CreateTransactionForm };
