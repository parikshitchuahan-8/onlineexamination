import React, { useState } from "react";
import api from "../services/api";

const InterviewPage = () => {

  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const res = await api.get("/interview/question", {
        params: { topic }
      });

      setQuestion(res.data);
      setEvaluation("");
      setAnswer("");

    } catch (error) {
      console.error(error);
      alert("Failed to generate question");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    try {
      setLoading(true);

      const res = await api.post("/interview/evaluate", {
        question,
        answer
      });

      setEvaluation(res.data);

    } catch (error) {
      console.error(error);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Interview Practice
      </h1>

      {/* Topic Input */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Interview Topic
        </label>

        <input
          type="text"
          placeholder="Example: Spring Boot, Java, React"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Generate Question */}
      <button
        onClick={generateQuestion}
        disabled={loading || !topic}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Question"}
      </button>

      {/* Question */}
      {question && (
        <div className="mt-8 bg-gray-100 p-4 rounded">

          <h2 className="font-bold text-lg mb-2">
            Interview Question
          </h2>

          <p>{question}</p>

        </div>
      )}

      {/* Answer box */}
      {question && (
        <div className="mt-6">

          <label className="block font-medium mb-2">
            Your Answer
          </label>

          <textarea
            rows="5"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="Type your answer here..."
          />

          <button
            onClick={submitAnswer}
            disabled={loading || !answer}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>

        </div>
      )}

      {/* AI Evaluation */}
      {evaluation && (
        <div className="mt-8 bg-white shadow p-4 rounded border">

          <h2 className="text-xl font-bold mb-3">
            AI Evaluation
          </h2>

          <pre className="whitespace-pre-wrap">
            {evaluation}
          </pre>

        </div>
      )}

    </div>
  );
};

export default InterviewPage;