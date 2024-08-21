package com.dashboard.dashboard.system.entity;

import com.dashboard.dashboard.system.enums.EventType;
import com.fasterxml.jackson.annotation.JsonBackReference;

import io.micrometer.common.lang.Nullable;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType eventType;

    @Column(nullable = false)
    private String pageUrl;

    @Column(nullable = false)
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
