package com.example.chatServer.models;

import org.springframework.http.HttpStatus;

public class ResponseTransfer {
    public String text;

    public ResponseTransfer(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
