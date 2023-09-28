import React from "react";
import { ClipLoader, PulseLoader, MoonLoader } from "react-spinners";
import { CSSProperties } from "react";

const Loading = () => {
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#fff",
  };
  return (
    <>
      <div className="spinner">
        <MoonLoader
          color="blue"
          loading={true}
          size={40}
          cssOverride={CSSProperties}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loading;
