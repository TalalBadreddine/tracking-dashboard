package com.dashboard.dashboard.system.queue;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dashboard.dashboard.system.socket.model.EventData;

@Service
public class MessageQueueService {

    @Autowired
    private AmqpTemplate amqpTemplate;

    @Value("${spring.rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${spring.rabbitmq.routing.key}")
    private String routingKey;

    public void saveEvents(EventData eventData) {
        amqpTemplate.convertAndSend(exchangeName, routingKey, eventData);
    }
}
