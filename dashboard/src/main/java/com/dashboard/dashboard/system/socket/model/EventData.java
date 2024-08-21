package com.dashboard.dashboard.system.socket.model;

import java.time.Instant;

import com.dashboard.dashboard.system.enums.EventType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventData {

    private String projectName;

    private EventType eventType;

    private String pageUrl;

    private Instant timestamp;

    private String elementId;

    private Long duration;

    private Integer scrollPosition;

    private String videoId;

    private String errorMessage;

    private String errorSource;

    private Integer errorLine;

    private Integer errorColumn;

    private String outboundUrl;

}
