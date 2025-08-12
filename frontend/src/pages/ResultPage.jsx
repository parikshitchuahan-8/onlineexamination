import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ResultsPage = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const lastResultData = localStorage.getItem('lastResult');
        if (lastResultData) {
            const parsedResult = JSON.parse(lastResultData);
            if (parsedResult.id == id) {
                setResult(parsedResult);
            }
        }
        setLoading(false);
    }, [id]);

    if (loading) return <p className="text-center mt-8">Loading Results...</p>;
    if (!result) return (
        <div className="text-center mt-8 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Result Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't load your result. This can happen if you refresh the page. Please return to the dashboard.</p>
            <Link to="/" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                Back to Dashboard
            </Link>
        </div>
    );
    
    const percentage = ((result.score / result.totalQuestions) * 100).toFixed(2);
    const pass = percentage >= 50;

    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
                <h2 className="text-xl font-semibold mb-6">{result.quiz.title}</h2>
                <div className={`p-6 rounded-lg mb-6 ${pass ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-lg font-medium">Your Score:</p>
                    <p className={`text-5xl font-bold my-2 ${pass ? 'text-green-600' : 'text-red-600'}`}>
                        {result.score} / {result.totalQuestions}
                    </p>
                    <p className="text-2xl font-semibold">({percentage}%)</p>
                </div>
                <p className={`text-2xl font-bold mb-8 ${pass ? 'text-green-600' : 'text-red-500'}`}>
                    {pass ? "Congratulations, you passed!" : "Better luck next time!"}
                </p>
                <Link to="/" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default ResultsPage;