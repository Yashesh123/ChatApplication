package com.example.chatServer.exception;


public class InvalidUserException extends Exception{
    public InvalidUserException(String exceptionMessage) {
        super(exceptionMessage);
    }
}
