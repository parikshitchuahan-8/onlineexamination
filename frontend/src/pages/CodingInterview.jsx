import React, { useState } from "react";
import api from "../services/api";

const CodingInterview = () => {

  const [topic,setTopic] = useState("");
  const [question,setQuestion] = useState("");
  const [code,setCode] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  const generateQuestion = async () => {

    const res = await api.get("/coding/question",{
      params:{topic}
    });

    setQuestion(res.data);
  };

  const submitCode = async () => {

    try{

      setLoading(true);

      const res = await api.post("/coding/evaluate",{
        question,
        code
      });

      setResult(res.data);

    }catch(err){

      console.error(err);
      alert("Evaluation failed");

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Coding Interview
      </h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Topic (DSA, Java, Arrays...)"
        value={topic}
        onChange={(e)=>setTopic(e.target.value)}
      />

      <button
        onClick={generateQuestion}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Generate Coding Question
      </button>

      {question && (

        <div className="mt-6">

          <h2 className="font-bold text-lg mb-2">
            Question
          </h2>

          <p className="bg-gray-100 p-4 rounded">
            {question}
          </p>

          <textarea
            rows="10"
            className="border w-full p-3 mt-4 font-mono"
            placeholder="Write your code here..."
            value={code}
            onChange={(e)=>setCode(e.target.value)}
          />

          <button
            onClick={submitCode}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded"
          >
            Submit Code
          </button>

        </div>
      )}

      {result && (

        <div className="mt-6 bg-white shadow p-4 rounded">

          <h2 className="font-bold mb-2">
            AI Evaluation
          </h2>

          <pre className="whitespace-pre-wrap">
            {result}
          </pre>

        </div>

      )}

    </div>

  );

};

export default CodingInterview;