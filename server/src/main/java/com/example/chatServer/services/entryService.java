package com.example.chatServer.services;

import com.example.chatServer.constants.appConstants;
import com.example.chatServer.entities.user;
import com.example.chatServer.exception.InvalidUserException;
import com.example.chatServer.models.ResponseTransfer;
import com.example.chatServer.models.SignInForm;
import com.example.chatServer.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class entryService {

    @Autowired
    UserRepository userRepository;

    public ResponseTransfer doSignIn(SignInForm form) {
        String name = form.getName();
        String password = form.getPassword();
        userRepository.save(new user(name, password));
        return new ResponseTransfer(appConstants.SUCCESS_SIGNIN_MESSAGE);
    }

    public ResponseTransfer doLogin(SignInForm form) throws InvalidUserException {
        String name = form.getName();
        String password = form.getPassword();
        boolean isUserExists = userRepository.existsByNameAndPassword(name, password);
        if(isUserExists)
            return new ResponseTransfer(appConstants.SUCCESS_LOGIN_MESSAGE);
        else
            throw new InvalidUserException(appConstants.FAILURE_LOGIN_MESSAGE);
    }
}
