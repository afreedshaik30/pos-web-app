package com.pos.main.repository;

import com.pos.main.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE t.timestamp BETWEEN :start AND :end")
    List<Transaction> findByDateRange(LocalDateTime start, LocalDateTime end);
}