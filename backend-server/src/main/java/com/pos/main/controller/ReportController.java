package com.pos.main.controller;

import com.pos.main.entity.Transaction;
import com.pos.main.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private TransactionRepository transactionRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/monthly")
    public ResponseEntity<List<Transaction>> getMonthlyReport(@RequestParam int year, @RequestParam int month) {
        try {
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDateTime start = yearMonth.atDay(1).atStartOfDay();
            LocalDateTime end = yearMonth.atEndOfMonth().atTime(23, 59, 59);
            return ResponseEntity.ok(transactionRepository.findByDateRange(start, end));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Avoid returning null body
        }
    }
}

// GET - /api/reports/monthly?year={year}&month={month}