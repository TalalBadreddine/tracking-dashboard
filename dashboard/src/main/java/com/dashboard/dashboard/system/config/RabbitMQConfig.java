package com.dashboard.dashboard.system.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {

    @Value("${spring.rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${spring.rabbitmq.routing.key}")
    private String routingKey;

    @Value("${spring.rabbitmq.queue.name}")
    private String queueName;

    @Bean
    Queue queue() {
        return new Queue(queueName, true);
    }

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }

    @Bean
    MessageConverter jsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
        return new Jackson2JsonMessageConverter(mapper);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(routingKey);
    }

    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
            MessageConverter rabbitJsonMessageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(rabbitJsonMessageConverter);
        return template;
    }
}
