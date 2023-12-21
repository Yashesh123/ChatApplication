package com.example.chatServer.controller;


import com.example.chatServer.exception.InvalidUserException;
import com.example.chatServer.models.ResponseTransfer;
import com.example.chatServer.models.SignInForm;
import com.example.chatServer.services.entryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class messageController {

    @Value("${origin-client-url}")
    public String originURL;

    @Autowired
    public entryService entryService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<ResponseTransfer> signIn(@RequestBody SignInForm body) {
        ResponseTransfer responseTransferObject = entryService.doSignIn(body);
        return new ResponseEntity<>(responseTransferObject, HttpStatus.OK);
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<ResponseTransfer> loginIn(@RequestBody SignInForm body) throws InvalidUserException {
        ResponseTransfer responseTransferObject = entryService.doLogin(body);
        return new ResponseEntity<>(responseTransferObject, HttpStatus.OK);
    }
}
