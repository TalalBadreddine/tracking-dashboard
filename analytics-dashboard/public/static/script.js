const WS_ENDPOINT = 'ws://localhost:8080/ws/event';

const urlParams = new URLSearchParams(document.currentScript.src.split('?')[1]);
const projectName = urlParams.get('projectName');

let ws = null;

function setupWebSocket() {
    ws = new WebSocket(WS_ENDPOINT);

    ws.onopen = () => {
        console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        setTimeout(setupWebSocket, 5000); // Reconnect after 5 seconds
    };
}

function sendEventData(event) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ projectName, ...event }));
    } else {
        console.error('WebSocket is not connected');
    }
}

function trackPageView() {
    sendEventData({
        eventType: 'PAGE_VIEW',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
    });
}

function trackClick(event) {
    sendEventData({
        eventType: 'CLICK',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        elementId: event.target.id || null
    });
}

function trackFormSubmission(event) {
    sendEventData({
        eventType: 'FORM_SUBMISSION',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        elementId: event.target.id || null
    });
}

function trackScroll() {
    sendEventData({
        eventType: 'SCROLL',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        scrollPosition: window.scrollY || document.documentElement.scrollTop
    });
}

let pageLoadTime = Date.now();
function trackTimeOnPage() {
    sendEventData({
        eventType: 'TIME_ON_PAGE',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        duration: Date.now() - pageLoadTime
    });
}

function handleBeforeUnload() {
    trackTimeOnPage();
    // Optionally handle any cleanup here if needed
}

document.addEventListener('DOMContentLoaded', trackPageView);
document.addEventListener('click', trackClick);
document.addEventListener('submit', trackFormSubmission);
window.addEventListener('scroll', trackScroll);
window.addEventListener('beforeunload', handleBeforeUnload);

// Initialize WebSocket connection
setupWebSocket();
