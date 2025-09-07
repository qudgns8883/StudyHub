package com.Dallyeowa.Dallyeowa;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class home {

    @GetMapping("/hi")
    public String home() {
        return "Welcome to Dallyeowa!";
    }
}
