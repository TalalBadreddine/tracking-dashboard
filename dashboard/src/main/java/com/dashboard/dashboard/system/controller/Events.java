package com.dashboard.dashboard.system.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dashboard.dashboard.system.dto.CreateEventDTO;
import com.dashboard.dashboard.system.dto.CreateEventsDTO;
import com.dashboard.dashboard.system.entity.Event;
import com.dashboard.dashboard.system.service.EventService;

@RequestMapping("events")
@RestController
public class Events {

    @Autowired
    private EventService eventService;

    @GetMapping()
    public ResponseEntity<?> getAllEvents(@RequestParam(name = "projectName") String projectName) {
        if (projectName == null || projectName.isEmpty()) {
            return new ResponseEntity<>("Project name must not be empty", HttpStatus.BAD_REQUEST);
        }

        List<Event> events = eventService.findAllByProjectName(projectName);

        return new ResponseEntity<>(events, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<?> createEvents(@RequestBody @Valid CreateEventsDTO request) {
        List<CreateEventDTO> events = request.getEvents();
        String projectName = request.getProjectName();

        if (projectName == null || projectName.isEmpty()) {
            return ResponseEntity.badRequest().body("Project name must not be empty");
        }

        try {
            this.eventService.saveEvents(projectName, events);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request");
        }
    }

}
