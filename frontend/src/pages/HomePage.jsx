import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../services/quizService';

const HomePage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await getAllQuizzes();
                setQuizzes(response.data);
            } catch  {
                setError('Failed to fetch quizzes.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    if (loading) return <p className="text-center mt-8">Loading quizzes...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
            <div className="space-y-4">
                {quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{quiz.title}</h2>
                            <p className="text-gray-600">{quiz.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{quiz.questions.length} Questions | {quiz.durationMinutes} Minutes</p>
                        </div>
                        <Link to={`/quiz/${quiz.id}`} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                            Start Quiz
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomePage;