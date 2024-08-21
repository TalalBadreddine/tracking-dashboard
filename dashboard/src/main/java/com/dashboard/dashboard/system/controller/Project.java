package com.dashboard.dashboard.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dashboard.dashboard.system.service.ProjectService;

@RequestMapping("project")
@RestController
public class Project {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    private ResponseEntity<?> findAll() {
        return new ResponseEntity<>(this.projectService.findAll(), HttpStatus.ACCEPTED);
    }

}
