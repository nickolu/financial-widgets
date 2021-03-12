import styled from "styled-components";
import { FormGroup } from "reactstrap";
export const FinancialFormGroup = styled(FormGroup)`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;

    label {
        width: 25%;
    }
    input,
    select {
        max-width: 75%;
    }
`;
