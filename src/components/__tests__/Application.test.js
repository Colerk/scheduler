import React from "react";

import { render, cleanup, waitForElement, getByPlaceholderText, fireEvent, queryByText, getByText, prettyDOM, getAllByTestId, getByAltText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />)
    
    await waitForElement(() => getByText(container, "Archie Cohen"))

     const appointment = getAllByTestId(container, "appointment")[0];
      
     fireEvent.click(getByAltText(appointment, "Add"));

     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
       target: { value: "Lydia Miller-Jones" }
     });
     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
     
     fireEvent.click(getByText(appointment, "Save"));
     
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElement(() => queryByText(appointment, "Deleting"));

   
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
   
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      // console.log(prettyDOM(appointment))
      
      fireEvent.click(getByAltText(appointment, "Edit"));
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByText(appointment, "Save"));
      
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      
      await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
      
      const day = getAllByTestId(container, "day").find(day => 
        queryByText(day, "Monday")
        );
        
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  
  });
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />)
    
    await waitForElement(() => getByText(container, "Archie Cohen"))

     const appointment = getAllByTestId(container, "appointment")[0];
      
     fireEvent.click(getByAltText(appointment, "Add"));

     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
       target: { value: "Lydia Miller-Jones" }
     });
     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
     
     fireEvent.click(getByText(appointment, "Save"));
     
     await waitForElement(() => queryByText(appointment, "Error"));
     
     expect(getByText(appointment, "Error")).toBeInTheDocument();

  });

  it("shows the save error when failing to Delete an appointment", async () => {
    
    axios.put.mockRejectedValueOnce();
    
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
    
    fireEvent.click(getByAltText(appointment, "Delete"));

    
    await waitForElement(() => queryByText(appointment, "Delete the appointment?"));
    
    fireEvent.click(getByText(appointment, "Confirm"));
    
    await waitForElement(() => queryByText(appointment, "Deleting"));

      const day = getAllByTestId(container, "day").find(day => 
        queryByText(day, "Monday")
        );
        
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
      
  });

});

