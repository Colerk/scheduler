import React from 'react';

export default function Empty(props) {


  return (
    <main className="appointment__add">
      <img
        src="images/add.png"
        onClick={props.onAdd}
        className="appointment__add-button"
        alt="Add"
      />
    </main>

  );
}