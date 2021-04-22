import React from "react";

import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);


describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
  const fn = jest.fn();

    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );    
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });



  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();

    const { queryByText, getByText } = render(
      <Form interviewers={interviewers} name="" onSave={onSave}/>
    );  
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    expect(onSave).not.toHaveBeenCalled();

  });
  


  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    const interviewerId = 1;
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByTestId("person"));
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewerId);
  });

});