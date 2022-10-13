import React from "react";
import S3 from "./components/S3";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <S3 />
    </div>
  );
};

export default App;
