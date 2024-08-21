package com.dashboard.dashboard.system.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dashboard.dashboard.system.repository.EventRepository;
import com.dashboard.dashboard.system.repository.ProjectRepository;
import com.dashboard.dashboard.system.socket.model.EventData;

import jakarta.transaction.Transactional;

import com.dashboard.dashboard.system.dto.CreateEventDTO;
import com.dashboard.dashboard.system.entity.Event;
import com.dashboard.dashboard.system.entity.Project;
import com.dashboard.dashboard.system.model.EventModel;
import com.dashboard.dashboard.system.model.PageClickCount;
import com.dashboard.dashboard.system.model.PageTimeSpent;
import com.dashboard.dashboard.system.model.PageViewCount;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public List<Event> findAllByProjectName(String projectName) {
        return eventRepository.findAllByProjectName(projectName);
    }

    @Transactional
    public void saveEvents(String projectName, List<CreateEventDTO> events) {

        try {
            Project project = projectRepository.findByName(projectName)
                    .orElseGet(() -> projectRepository.save(new Project(null, projectName, null)));

            List<Event> eventList = new ArrayList<>();
            for (CreateEventDTO dto : events) {
                Event event = new Event();
                event.setProject(project);
                event.setEventType(dto.getEventType());
                event.setPageUrl(dto.getPageUrl());
                event.setTimestamp(dto.getTimestamp());
                event.setElementId(dto.getElementId());
                event.setDuration(dto.getDuration());
                event.setScrollPosition(dto.getScrollPosition());
                event.setVideoId(dto.getVideoId());
                event.setErrorMessage(dto.getErrorMessage());
                event.setErrorSource(dto.getErrorSource());
                event.setErrorLine(dto.getErrorLine());
                event.setErrorColumn(dto.getErrorColumn());
                event.setOutboundUrl(dto.getOutboundUrl());

                eventList.add(event);
            }

            eventRepository.saveAll(eventList);
        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    public EventModel getEventModel(String projectName) {
        long totalClicks = calculateTotalClicks(projectName);
        long timeSpentInProject = calculateTotalTimeSpentInProject(projectName);
        long errorCount = calculateTotalErrorCount(projectName);
        List<PageClickCount> totalClickInEachPage = calculateCountClickPerProjectPage(projectName);
        List<PageTimeSpent> timeSpentInPage = calculateTimeSpentPerPage(projectName);
        List<PageViewCount> pageViewCount = calculatePageViewsByPageUrl(projectName);

        EventModel eventModel = new EventModel(
                totalClicks,
                timeSpentInProject,
                errorCount,
                totalClickInEachPage,
                timeSpentInPage,
                pageViewCount);

        return eventModel;
    }

    private long calculateTotalClicks(String projectName) {
        return this.eventRepository.countClicksByProjectName(projectName);
    }

    private List<PageClickCount> calculateCountClickPerProjectPage(String projectName) {
        List<Object[]> results = this.eventRepository.countClickPerPage(projectName);

        List<PageClickCount> clickCounts = results.stream()
                .map(row -> new PageClickCount(
                        (String) row[0],
                        (Long) row[1]))
                .collect(Collectors.toList());

        return clickCounts;
    }

    public List<PageTimeSpent> calculateTimeSpentPerPage(String projectName) {
        List<Object[]> results = this.eventRepository.getTimeSpentPerPage(projectName);

        return results.stream()
                .map(row -> new PageTimeSpent(
                        (String) row[0],
                        ((Number) row[1]).longValue() / 1000))
                .collect(Collectors.toList());
    }

    public Long calculateTotalTimeSpentInProject(String projectName) {
        Long durationInMillis = this.eventRepository.getTotalTimeSpentInProject(projectName);
        if (durationInMillis == null) {
            return 0L;
        }
        return durationInMillis / 1000;
    }

    public List<PageViewCount> calculatePageViewsByPageUrl(String projectName) {
        List<Object[]> results = this.eventRepository.countPageViewsByPageUrl(projectName);

        return results.stream()
                .map(row -> new PageViewCount(
                        (String) row[0],
                        ((Number) row[1]).longValue()))
                .collect(Collectors.toList());
    }

    public Long calculateTotalErrorCount(String projectName) {
        return this.eventRepository.countErrors(projectName);
    }

    public void createEvent(EventData payload) {
        Project project = projectRepository.findByName(payload.getProjectName())
                .orElseGet(() -> projectRepository.save(new Project(null, payload.getProjectName(), null)));

        Event event = new Event();
        event.setProject(project);
        event.setEventType(payload.getEventType());
        event.setPageUrl(payload.getPageUrl());
        event.setTimestamp(payload.getTimestamp());
        event.setElementId(payload.getElementId());
        event.setDuration(payload.getDuration());
        event.setScrollPosition(payload.getScrollPosition());
        event.setVideoId(payload.getVideoId());
        event.setErrorMessage(payload.getErrorMessage());
        event.setErrorSource(payload.getErrorSource());
        event.setErrorLine(payload.getErrorLine());
        event.setErrorColumn(payload.getErrorColumn());
        event.setOutboundUrl(payload.getOutboundUrl());

        this.eventRepository.save(event);

    }

}