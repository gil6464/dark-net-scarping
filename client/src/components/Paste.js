import React from "react";
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
  //* Fix time of each paste to look better
  pastes.map(paste => {
    paste.time = new Date(paste.time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  });
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
