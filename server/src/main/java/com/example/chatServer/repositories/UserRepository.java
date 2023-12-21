package com.example.chatServer.repositories;

import com.example.chatServer.entities.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<user, String> {

    boolean existsByNameAndPassword(String name, String password);
}
