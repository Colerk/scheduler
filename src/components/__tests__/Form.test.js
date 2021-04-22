
import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";
import { fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    const interviewerId = 1;
    
    const input = getByPlaceholderText("Enter Student Name");

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByTestId("person"));
    fireEvent.click(getByText("Save"));
    
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewerId);
  
  });

    

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});
