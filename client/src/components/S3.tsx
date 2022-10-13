import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { $api } from "../http";

const S3: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
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
    const { key, url } = data.data.signature;

    await axios.put(url, file, {
      headers: { "Content-Type": file?.type },
    });

    const fileData = await $api.post("/files", { key });
    await axios.post("/posts", {
      title,
      body,
      description,
      key: fileData.data.data.file.key,
    });
    setFile(null);
  };

  return (
    <div className="w-[500px] mx-auto my-10">
      <form className="flex flex-col bg-gray-50 p-3" onSubmit={submit}>
        <div className="border min-h-[400px] mb-3 flex justify-center items-center">
          {preview ? <img src={preview} alt="preview" /> : <h5>No image</h5>}
        </div>

        <input
          className="mb-2"
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
        />

        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border py-1.5 mb-2 p-2"
          placeholder="title"
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          className="border py-1.5 mb-2 p-2"
          placeholder="body"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="border py-1.5 mb-2 p-2"
          placeholder="description"
          rows={6}
        />

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
