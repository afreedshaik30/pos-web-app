package com.pos.main.controller;

import com.pos.main.entity.Transaction;
import com.pos.main.repository.TransactionRepository;
import com.pos.main.service.TransactionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionRepository transactionRepository;

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @PostMapping
    public ResponseEntity<?> createTransaction(@Valid @RequestBody TransactionRequest request) {
        try {
            Transaction transaction = transactionService.createTransaction(
                    request.getUserId(), request.getProductId(), request.getQuantity()
            );
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add transaction: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionRepository.findAll());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    @GetMapping("/{id}/receipt")
    public ResponseEntity<String> getReceipt(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(transactionService.generateReceipt(id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch receipt: " + e.getMessage());
        }
    }
}

class TransactionRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}

/*
   POST  --  /api/transactions – Create a new transaction (Admin and Staff).
   GET   --  /api/transactions – Get all transactions (Admin and Staff).
   GET   --  /api/transactions/{id}/receipt – Get receipt for a transaction (Admin and Staff).
*/