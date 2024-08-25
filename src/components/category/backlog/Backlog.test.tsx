import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DatabaseContext } from "../../../context/DatabaseContext";
import { MemoryRouter } from "react-router-dom";
import { Database } from "../../../context/DatabaseContext";
import Backlog from "./Backlog";
import BacklogList from "./BacklogList";
import NewInput from "./NewInput";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Backlog tests", () => {
  it("renders Backlog component and adds a new item", () => {
    const mockDatabase = {
      backlog: [],
      ready: [],
      progress: [],
      finished: [],
    };

    const mockSetDatabase = jest.fn();

    render(
      <MemoryRouter>
        <DatabaseContext.Provider
          value={{ database: mockDatabase, setDatabase: mockSetDatabase }}
        >
          <Backlog />
        </DatabaseContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("+ Add card"));
    fireEvent.change(screen.getByTestId("backlog-input"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(mockSetDatabase).toHaveBeenCalled();
  });

  it("renders BacklogList component and navigates to detail page", () => {
    const mockDatabase: Database = {
      backlog: [
        {
          id: "1",
          value: "Task 1",
          category: "backlog",
          text: "This task has no description",
        },
      ],
      ready: [],
      progress: [],
      finished: [],
    };

    render(
      <MemoryRouter>
        <BacklogList
          status={false}
          database={mockDatabase}
          setNewInput={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Task 1"));
    expect(mockNavigate).toHaveBeenCalledWith("/detail/1");
  });

  it("renders NewInput component and handles input change", () => {
    const mockSetNewInput = jest.fn();
    render(<NewInput setNewInput={mockSetNewInput} />);

    const inputElement = screen.getByTestId("backlog-input");
    expect(inputElement).toHaveFocus();

    fireEvent.change(inputElement, { target: { value: "New Input" } });
    expect(mockSetNewInput).toHaveBeenCalledWith("New Input");
  });
});
