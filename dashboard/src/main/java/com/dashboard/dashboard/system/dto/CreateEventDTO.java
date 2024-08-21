package com.dashboard.dashboard.system.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.dashboard.dashboard.system.enums.EventType;

import io.micrometer.common.lang.Nullable;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class CreateEventDTO {

    @NotNull(message = "Project Name must not be null")
    private String projectName;

    @NotNull(message = "Event type must not be null")
    private EventType eventType;

    @NotNull(message = "Page URL must not be null")
    @Size(max = 255, message = "Page URL must be less than 255 characters")
    private String pageUrl;

    @Nullable
    private Instant timestamp;

    private String elementId;

    @Nullable
    private Long duration;

    @Nullable
    private Integer scrollPosition;

    @Nullable
    private String videoId;

    @Nullable
    private String errorMessage;

    @Nullable
    private String errorSource;

    @Nullable
    private Integer errorLine;

    @Nullable
    private Integer errorColumn;

    @Nullable
    private String outboundUrl;

}
