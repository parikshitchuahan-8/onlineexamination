import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAIQuiz } from "../services/quizService";

const AiQuizGenerator = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "EASY",
    count: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await generateAIQuiz(form);
    navigate(`/quiz/${res.data.id}`);

    } catch (err) {
      alert("Failed to generate AI quiz");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Generate AI Quiz
      </h1>

      <input
        type="text"
        name="title"
        placeholder="Quiz Title"
        className="w-full mb-4 p-3 border rounded"
        onChange={handleChange}
      />

      <input
        type="text"
        name="topic"
        placeholder="Topic (e.g. Java OOP)"
        className="w-full mb-4 p-3 border rounded"
        onChange={handleChange}
      />

      <select
        name="difficulty"
        className="w-full mb-4 p-3 border rounded"
        onChange={handleChange}
      >
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>

      <input
        type="number"
        name="count"
        min="1"
        max="20"
        className="w-full mb-6 p-3 border rounded"
        onChange={handleChange}
        value={form.count}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate AI Quiz"}
      </button>
    </div>
  );
};

export default AiQuizGenerator;
