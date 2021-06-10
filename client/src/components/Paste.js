import React from "react";
// TODO fix date
function Paste({ pastes, loading }) {
  //* Spinner
  if (loading) {
    return (
      <div className="center">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    );
  }
  console.log(pastes.length);
  return (
    <div>
      {pastes.map((paste, i) => (
        <div className="paste-container" key={i}>
          <h1 className="paste-title">{paste.title}</h1>
          <p className="paste-text">{paste.text}</p>
          <p className="paste-data">
            Write: {paste.author} | Time: {paste.time}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Paste;
