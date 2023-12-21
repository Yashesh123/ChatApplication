package com.example.chatServer.exception;

import com.example.chatServer.models.ResponseTransfer;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidUserException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    protected ResponseEntity<ResponseTransfer> handleInvalidUserException(final HttpServletRequest httpServletRequest, InvalidUserException exception){
        return new ResponseEntity<>(new ResponseTransfer(exception.getMessage()), HttpStatus.FORBIDDEN);
    }
}
