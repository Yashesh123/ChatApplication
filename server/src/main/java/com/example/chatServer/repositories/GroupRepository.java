package com.example.chatServer.repositories;

import com.example.chatServer.entities.groupMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<groupMessages, String> {
}
