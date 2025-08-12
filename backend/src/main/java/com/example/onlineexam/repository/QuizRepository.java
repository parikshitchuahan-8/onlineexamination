package com.example.onlineexam.repository;
import com.example.onlineexam.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
public interface QuizRepository extends JpaRepository<Quiz, Long> {}