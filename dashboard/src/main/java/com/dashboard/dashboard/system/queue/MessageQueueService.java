package com.dashboard.dashboard.system.queue;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dashboard.dashboard.system.config.RabbitMQConfig;
import com.dashboard.dashboard.system.socket.model.EventData;

@Service
public class MessageQueueService {

    @Autowired
    private AmqpTemplate amqpTemplate;

    public void saveEvents(EventData eventData) {
        amqpTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, eventData);
    }
}
