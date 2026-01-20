import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizDetails, getQuizQuestions, submitQuiz } from '../services/quizService';
import Timer from '../components/Timer';

const ExamPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleSubmit = useCallback(async () => {
        try {
            const response = await submitQuiz(id, answers);
            localStorage.setItem('lastResult', JSON.stringify(response.data));
            navigate(`/results/${response.data.id}`);
        } catch (error) {
            console.error("Failed to submit quiz", error);
            alert("There was an error submitting your quiz.");
        }
    }, [id, answers, navigate]);

    const handleTimeUp = useCallback(() => {
        alert("Time's up! Your quiz will be submitted automatically.");
        handleSubmit();
    }, [handleSubmit]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizDetailsRes = await getQuizDetails(id);
                const quizQuestionsRes = await getQuizQuestions(id);
                setQuiz(quizDetailsRes.data);
                setQuestions(quizQuestionsRes.data);
            } catch (error) {
                console.error("Failed to load quiz data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizData();
    }, [id]);

    const handleAnswerSelect = (questionId, optionIndex) => setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    const goToNext = () => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(prev => prev + 1);
    const goToPrevious = () => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1);

    if (loading) return <p className="text-center mt-8">Loading Quiz...</p>;
    if (!quiz) return <p className="text-center mt-8">Quiz not found.</p>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{quiz.title}</h1>
                    <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <Timer
                  initialMinutes={quiz.durationMinutes || 10}
                  onTimeUp={handleTimeUp}
                />

            </div>

            {currentQuestion && (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6">{currentQuestionIndex + 1}. {currentQuestion.text}</h2>
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className={`block p-4 rounded-lg border cursor-pointer transition-colors ${answers[currentQuestion.id] === index ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                                <input type="radio" name={`question-${currentQuestion.id}`} className="mr-3" checked={answers[currentQuestion.id] === index} onChange={() => handleAnswerSelect(currentQuestion.id, index)} />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6 flex justify-between items-center">
                <button onClick={goToPrevious} disabled={currentQuestionIndex === 0} className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                        Submit Quiz
                    </button>
                ) : (
                    <button onClick={goToNext} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};
export default ExamPage;