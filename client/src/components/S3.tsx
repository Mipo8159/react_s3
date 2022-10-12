import axios from "axios";
import React, { useState } from "react";

const S3: React.FC = () => {
  const [file, setFIle] = useState<File>();

  const submit = async () => {
    const { data } = await axios.get("/files/signed-url");

    await axios.put(data.url, file, {
      headers: { "Content-Type": file?.type },
    });
  };

  return <div>S3</div>;
};

export default S3;
