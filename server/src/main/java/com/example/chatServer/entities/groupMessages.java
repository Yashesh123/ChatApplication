package com.example.chatServer.entities;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "group_messages")
public class groupMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer message_id;

    private String sender_name;
    private String message;

    private LocalDateTime sendTime;

    public groupMessages(){}

    public groupMessages(String senderName, String message, LocalDateTime time){
        super();
        this.message = message;
        this.sender_name = senderName;
        this.sendTime = time;
    }

    public Integer getMessage_id() {
        return message_id;
    }

    public String getSenderName() {
        return sender_name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setMessage_id(Integer message_id) {
        this.message_id = message_id;
    }

    public void setSenderName(String senderName) {
        this.sender_name = senderName;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
