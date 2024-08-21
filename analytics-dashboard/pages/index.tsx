"use client"

import React from 'react';

export default function Home() {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="100"
      style={{
        padding: '40px',
        maxWidth: '900px',
        margin: '0 auto',
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
        🚀 Real-Time Web Tracking Analysis
      </h1>

      <p style={{ marginBottom: '30px', fontSize: '1.2rem', color: '#555' }}>
        This project was completed in just <strong>one day</strong> as a fun challenge to refresh my Spring Boot skills.
        It’s a comprehensive real-time tracking solution designed to capture and analyze web events, offering
        valuable insights into user behavior and interactions.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          📊 Project Overview
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          The project tracks and logs various user events, including page visits, element interactions,
          scroll positions, and errors. The collected data is processed to analyze user engagement
          and optimize web performance in real-time.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          🛠️ Key Features
        </h2>
        <ul style={{ fontSize: '1.1rem', listStyleType: 'disc', paddingLeft: '20px', color: '#555' }}>
          <li>Tracks user events such as clicks, page loads, and scrolls.</li>
          <li>Logs errors for debugging purposes.</li>
          <li>Supports video event tracking and outbound link clicks.</li>
          <li>Processes data in real-time using RabbitMQ for message queuing.</li>
          <li>Updates the dashboard live via WebSockets for immediate feedback.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          ⚙️ How It Works
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          The tracking script is lightweight and easily embeddable via a CDN. It sends event data to the backend,
          where it is processed and saved for analysis. RabbitMQ handles message queuing during event storage,
          while WebSockets push real-time updates to the dashboard. The frontend fetches data changes every second
          through the WebSocket connection.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          🚀 Fast Development
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          The entire project was built in <strong>one day</strong>, offering a quick way to refresh my Spring Boot
          skills while delivering a functional tracking solution.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          🌐 Implementation Details
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Include the tracking script from the CDN in your project, and it will handle capturing and sending events
          to the backend. The solution is designed to be scalable and highly configurable for any web application.
        </p>
      </section>

      <section>
        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px', color: '#333' }}>
          🏗️ Tech Stack
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          - <strong>Frontend:</strong> Next.js <br />
          - <strong>Backend:</strong> Spring Boot <br />
          - <strong>Message Queue:</strong> RabbitMQ <br />
          - <strong>Sockets:</strong> WebSockets for real-time dashboard updates <br />
          - <strong>Frontend Tracking:</strong> CDN-hosted script <br />
          - <strong>Real-Time Processing:</strong> Event-based tracking and updates
        </p>
      </section>
    </div>
  );
}
