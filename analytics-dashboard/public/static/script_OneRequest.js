const API_ENDPOINT = 'http://localhost:8080/events';

const urlParams = new URLSearchParams(document.currentScript.src.split('?')[1]);
const projectName = urlParams.get('projectName');

let eventData = [];

function sendEventData() {
    if (eventData.length > 0) {
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ projectName, events: eventData })
        }).then(response => {
            if (response.ok) {

                localStorage.removeItem('eventData');

                eventData = [];
            } else {
                console.error('Failed to send event data');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
}

function trackPageView() {
    eventData.push({
        eventType: 'PAGE_VIEW',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
    });
}

function trackClick(event) {
    eventData.push({
        eventType: 'CLICK',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        elementId: event.target.id || null
    });
}

function trackFormSubmission(event) {
    eventData.push({
        eventType: 'FORM_SUBMISSION',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        elementId: event.target.id || null
    });
}

function trackScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    eventData.push({
        eventType: 'SCROLL',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        scrollPosition: scrollPosition
    });
}

let pageLoadTime = Date.now();
function trackTimeOnPage() {
    const timeSpent = Date.now() - pageLoadTime;
    eventData.push({
        eventType: 'TIME_ON_PAGE',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        duration: timeSpent
    });
}

function handleBeforeUnload(event) {
    trackTimeOnPage();
    localStorage.setItem('eventData', JSON.stringify(eventData));

    sendEventData();
}

document.addEventListener('DOMContentLoaded', trackPageView);
document.addEventListener('click', trackClick);
document.addEventListener('submit', trackFormSubmission);
window.addEventListener('scroll', trackScroll);
window.addEventListener('beforeunload', handleBeforeUnload);

window.addEventListener('load', () => {
    const storedEventData = JSON.parse(localStorage.getItem('eventData'));
    if (storedEventData) {

        eventData = [];
        eventData.push(...storedEventData);
        sendEventData();
    }
});
