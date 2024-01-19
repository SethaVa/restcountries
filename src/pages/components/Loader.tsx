import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "",
};

export const Loader = () => {
  return (
    <ClipLoader
      color="#ffffff"
      loading={true}
      cssOverride={override}
      size={70}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
