import { render } from "@testing-library/react";
import App from "./App";

jest.mock("uuid", () => {
    let currentId = 0;
    return {
        v4: () => {
            currentId += 1;
            return currentId;
        },
    };
});

test("renders the main page", () => {
    const { container } = render(<App />);
    const appTree = container.querySelector(".App");
    expect(appTree).toMatchSnapshot();
});
