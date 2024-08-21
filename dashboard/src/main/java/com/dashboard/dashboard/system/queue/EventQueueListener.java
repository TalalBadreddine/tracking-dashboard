package com.dashboard.dashboard.system.queue;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dashboard.dashboard.system.config.RabbitMQConfig;
import com.dashboard.dashboard.system.service.EventService;
import com.dashboard.dashboard.system.socket.model.EventData;

@Service
public class EventQueueListener {

    @Autowired
    private EventService eventService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void handleEventMessages(EventData eventData) {
        eventService.createEvent(eventData);
    }
}