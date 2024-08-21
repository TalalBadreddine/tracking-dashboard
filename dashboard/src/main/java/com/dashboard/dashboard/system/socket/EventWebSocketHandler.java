package com.dashboard.dashboard.system.socket;

import com.dashboard.dashboard.system.model.EventModel;
import com.dashboard.dashboard.system.service.EventService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class EventWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private EventService eventService;

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("WebSocket connection established: " + session.getId());
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        Message incomingMessage = objectMapper.readValue(payload, Message.class);

        if ("update_data".equals(incomingMessage.getType())) {
            @SuppressWarnings("unchecked")
            Map<String, String> data = (Map<String, String>) incomingMessage.getData();
            String projectName = data.get("projectName");

            EventModel eventModel = this.eventService.getEventModel(projectName);
            this.sendMetricsUpdate(projectName, "event_analysis", eventModel);
        }
    }

    public void sendMetricsUpdate(String projectName, String type, Object data) throws IOException {
        Message message = new Message(type, data);
        String messageJson = objectMapper.writeValueAsString(new ProjectMessage(projectName, message));
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(messageJson));
            }
        }
    }
}
