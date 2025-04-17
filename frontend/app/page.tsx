"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [audio, setAudio] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };

  const uploadAudio = async () => {
    if (!audio) return;
    const formData = new FormData();
    formData.append("file", audio);

    const response = await axios.post("http://localhost:8000/upload-audio/", formData);
    setTranscript(response.data.transcript);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Gemini 2.0 Realtime Transcript</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={uploadAudio} className="bg-blue-500 text-white px-4 py-2 mt-2">Upload</button>
      {transcript && <p className="mt-4">Transcript: {transcript}</p>}
    </div>
  );
}
