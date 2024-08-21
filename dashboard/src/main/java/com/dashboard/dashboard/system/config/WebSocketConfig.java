package com.dashboard.dashboard.system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.dashboard.dashboard.system.socket.EventTriggeredHandler;
import com.dashboard.dashboard.system.socket.EventWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private EventWebSocketHandler eventWebSocketHandler;
    @Autowired
    private EventTriggeredHandler eventTriggeredHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(eventWebSocketHandler, "/ws").setAllowedOrigins("*");
        registry.addHandler(eventTriggeredHandler, "/ws/event").setAllowedOriginPatterns("*");
    }
}
