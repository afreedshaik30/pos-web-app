package com.pos.main.service;

import com.pos.main.entity.Product;
import com.pos.main.entity.Transaction;
import com.pos.main.entity.User;
import com.pos.main.repository.ProductRepository;
import com.pos.main.repository.TransactionRepository;
import com.pos.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Transaction createTransaction(Long userId, Long productId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setProduct(product);
        transaction.setQuantity(quantity);
        transaction.setTotalPrice(product.getPrice() * quantity);
        transaction.setTimestamp(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    public String generateReceipt(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return String.format(
                "Receipt\nProduct: %s\nQuantity: %d\nTotal: $%.2f\nDate: %s",
                transaction.getProduct().getName(),
                transaction.getQuantity(),
                transaction.getTotalPrice(),
                transaction.getTimestamp()
        );
    }
}
