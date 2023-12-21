package com.example.chatServer.config;

import com.example.chatServer.entities.groupMessages;
import com.example.chatServer.repositories.GroupRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class TxtWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    GroupRepository groupRepository;

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws IOException {
        // Handle incoming messages here
        String receivedMessage = (String) message.getPayload();
        System.out.println(receivedMessage);
        JSONObject jsonObject = new JSONObject(receivedMessage);
        // Process the message and send a response if needed
        System.out.println("here " + jsonObject.get("userName"));
        JSONObject send = new JSONObject();
        send.put("userName", jsonObject.get("userName"));
        send.put("messageString", "sent" + jsonObject.get("messageString"));
        LocalDateTime currentTime = LocalDateTime.now();
        send.put("sendTime", currentTime.toString());
        for(WebSocketSession socketSession: sessions){
            socketSession.sendMessage(new TextMessage((send.toString())));
        }
        callRepository(jsonObject.getString("userName"), jsonObject.getString("messageString"), currentTime);
    }
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
    // Perform actions when a new WebSocket connection is established
        System.out.println("after established");
        sessions.add(session);
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // Perform actions when a WebSocket connection is closed
    }

    private void callRepository(String userName, String message, LocalDateTime currentTime){
        this.groupRepository.save(
                new groupMessages(userName, message, currentTime)
        );
    }
}
