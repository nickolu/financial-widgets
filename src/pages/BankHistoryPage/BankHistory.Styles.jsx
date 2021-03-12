import styled from "styled-components";
import { Table } from "reactstrap";

const SummaryTable = styled(Table)`
    border td {
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

export { SummaryTable };
