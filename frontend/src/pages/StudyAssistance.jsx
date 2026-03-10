import React, { useState } from "react";
import api from "../services/api";

const StudyAssistant = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {

      setLoading(true);

      const res = await api.post("/study/ask", {
        question
      });

      setAnswer(res.data);

    } catch (err) {
      console.error(err);
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Study Assistant
      </h1>

      <textarea
        className="w-full border p-3 rounded"
        rows="4"
        placeholder="Ask anything about programming..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        disabled={loading || !question}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 p-4 rounded">

          <h2 className="font-bold mb-2">
            AI Response
          </h2>

          <p>{answer}</p>

        </div>
      )}

    </div>
  );
};

export default StudyAssistant;