package com.example.onlineexam.service;

import com.example.onlineexam.dto.QuizSubmissionRequest;
import com.example.onlineexam.model.Question;
import com.example.onlineexam.dto.AIQuestionResponse;
import com.example.onlineexam.model.Quiz;
import com.example.onlineexam.model.Result;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.QuestionRepository;
import com.example.onlineexam.repository.QuizRepository;
import com.example.onlineexam.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    @Autowired
    private AIQuestionService aiQuestionService;


    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;

    public Result calculateResult(User user, Long quizId, QuizSubmissionRequest submission) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        Map<Long, Integer> answers = submission.getAnswers();
        int score = 0;

        for (Map.Entry<Long, Integer> entry : answers.entrySet()) {
            Question question = questionRepository.findById(entry.getKey()).orElse(null);
            if (question != null && question.getCorrectAnswerIndex() == entry.getValue()) {
                score++;
            }
        }

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());
        result.setSubmissionTime(LocalDateTime.now());

        return resultRepository.save(result);
    }

    @Transactional
    public Quiz createAIQuiz(
            String title,
            String topic,
            String difficulty,
            int count) {

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setDurationMinutes(10);

        //  IMPORTANT: create list
        List<Question> questionList = new ArrayList<>();

        List<AIQuestionResponse> aiQuestions =
                aiQuestionService.generateQuestions(topic, difficulty, count);

        for (AIQuestionResponse aiQ : aiQuestions) {
            Question question = new Question();
            question.setText(aiQ.getQuestion());
            question.setOptions(aiQ.getOptions());
            question.setCorrectAnswerIndex(aiQ.getCorrectAnswerIndex());

            //  set relationship BOTH sides
            question.setQuiz(quiz);
            questionList.add(question);
        }

        //  attach questions to quiz
        quiz.setQuestions(questionList);

        //  save ONCE (cascade will save questions)
        return quizRepository.save(quiz);
    }



}
