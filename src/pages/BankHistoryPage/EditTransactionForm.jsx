import React, { useState, useEffect } from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { FinancialFormGroup } from "../../components/FinancialFormGroup";

const EditTransactionForm = ({ bankHistory }) => {
    const currentRecords = bankHistory.records;
    const [defaultRecord, setCurrentRecord] = useState(currentRecords[0]);
    const [id, setId] = useState(defaultRecord.id);
    const [description, setDescription] = useState(defaultRecord.description);
    const [date, setDate] = useState(new Date(defaultRecord.date));
    const [amount, setAmount] = useState(defaultRecord.amount);

    useEffect(() => {
        const selectedRecord = bankHistory.findRecordById(id);
        console.log(id);
        if (selectedRecord) {
            setCurrentRecord(selectedRecord.document);
            setAmount(selectedRecord.amount);
            setDescription(selectedRecord.description);
            setDate(selectedRecord.date);
        }
    }, [id, setId, bankHistory]);
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                const record = bankHistory.findRecordById(id);

                if (record) {
                    const modifiedRecord = {
                        ...record.document,
                        description: description,
                        date: date,
                        amount: amount,
                    };

                    bankHistory.updateRecord(modifiedRecord);
                }
            }}
        >
            <FinancialFormGroup>
                <Label htmlFor="id">Select Transaction</Label>
                <Input
                    type="select"
                    onChange={(e) => {
                        const selectedId = e.target.value;

                        setId(selectedId);
                    }}
                    value={id}
                >
                    {currentRecords.map((record) => {
                        return <option key={record.id}>{record.id}</option>;
                    })}
                </Input>
            </FinancialFormGroup>
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
                <Label htmlFor="date">Date</Label>
                <Input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
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

export { EditTransactionForm };
