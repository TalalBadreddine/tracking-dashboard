package com.dashboard.dashboard.system.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateEventsDTO {

    private String projectName;

    private List<CreateEventDTO> events;
}
