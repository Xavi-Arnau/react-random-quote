import React from "react";

const Quote = ({ text, author }) => {
  return (
    <>
      <blockquote>{text}</blockquote>
      <p>- {author}</p>
    </>
  );
};

export default Quote;
