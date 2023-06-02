"use client";

import React, { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  return (
    <div>
      <h2>Something Went Wrong!</h2>
      <button
        onClick={
          // Attempt to reset the error
          () => reset()
        }
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
