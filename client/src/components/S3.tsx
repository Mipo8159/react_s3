import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { $api } from "../http";

const S3: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await $api.get("/files/signed-url");
    const { url } = data.data.signature;

    await axios.put(url, file, {
      headers: { "Content-Type": file?.type },
    });
  };

  return (
    <div className="w-[500px] mx-auto my-10">
      <form className="flex flex-col bg-gray-50" onSubmit={submit}>
        <div className="border min-h-[400px] mb-3 flex justify-center items-center">
          {preview ? <img src={preview} alt="preview" /> : <h5>No image</h5>}
        </div>

        <input type="file" onChange={(e) => setFile(e.target.files![0])} />
        <button
          type="submit"
          className="mt-3 py-2 bg-black text-white uppercase"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default S3;
