# Dashboard Project (One-Day Challenge)

### Overview

This project was developed as part of a one-day coding challenge with the goal of creating a **<span style="color: #007bff;">personal decentralized</span>** web analysis dashboard. The application is designed to work across **<span style="color: #007bff;">multiple projects simultaneously</span>**, providing **<span style="color: #007bff;">real-time</span>** insights into what's working well and what's happening. By integrating a Spring Boot backend with a Next frontend, along with PostgreSQL, RabbitMQ, and PgAdmin, the dashboard offers a comprehensive tool for monitoring and analyzing data. Additionally, a JavaScript file (`script.js`) can be hosted as a **<span style="color: #007bff;">CDN</span>** to facilitate **<span style="color: #007bff;">real-time</span>** tracking and data transmission for enhanced analysis and decision-making.



## Fast Run

To quickly get the project up and running, follow these steps:

1. **Configure Environment Variables:**
   - Rename the example environment files to `.env` for both the frontend and backend:

     ```bash
     mv analytics-dashboard/.env.example analytics-dashboard/.env
     mv dashboard/src/main/resources/.env.example dashboard/src/main/resources/.env
     ```

   - Edit the `.env` files as needed to set up the required environment variables for your project.

2. **Start Docker Containers:**
   - Build and start the Docker containers for the backend, frontend, database, RabbitMQ, and PgAdmin:

     ```bash
     docker-compose up --build
     ```

   This command will build the images for your services and start the containers, setting up the entire development environment in one go.

By following these steps, you can quickly set up the project and start working with it locally.


### How It Works

This project is designed for real-time event processing and data visualization. Here's a breakdown of its components and functionality:

#### Real-Time Event Handling

1. **Event Dispatching:**
   - The project includes a `script.js` file located in the `public/static` folder. This script can be hosted on a CDN.
   - To use the CDN version of `script.js`, update the script URL by adding a query parameter `?projectName=theDashboard`. This helps identify and manage multiple scripts.

2. **Event Flow:**
   - The `script.js` file is responsible for dispatching multiple events in a single API request.
   - For real-time analysis, the script is updated to send each action using WebSockets. These actions are then pushed to a RabbitMQ queue for processing.

3. **Backend Processing:**
   - The backend listens to the RabbitMQ queue and processes incoming events.
   - Events are saved to the database, providing a persistent record of all actions.

4. **Frontend Data Update:**
   - The frontend is designed to update data every second using WebSockets.
   - It receives real-time updates from the backend, ensuring that the displayed information is always current.

This setup allows for efficient real-time data processing and visualization, leveraging WebSockets for immediate updates and RabbitMQ for reliable message queuing.


### Project Structure

The project is organized into several key directories and files, each serving a specific purpose. Here’s a brief overview of the project structure:

#### Root Directory
- **`docker-compose.yml`**: Defines and configures the multi-container Docker application, including services for the frontend, backend, RabbitMQ, PostgreSQL, and pgAdmin.

#### `dashboard/` Directory
- **`Dockerfile`**: Contains instructions to build the Docker image for the Spring Boot application. It includes steps for building and packaging the application.
- **`src/`**: Contains the source code for the Spring Boot application, including controllers, services, and repository classes.
- **`pom.xml`**: Maven configuration file that defines project dependencies and build settings for the backend application.

#### `analytics-dashboard/` Directory
- **`Dockerfile`**: Contains instructions to build the Docker image for the React application. It includes steps for installing dependencies and building the frontend assets.
- **`public/static/`**: Contains the `script.js` file for dispatching events and real-time data updates. This file can be hosted on a CDN.
- **`src/`**: Contains the source code for the React application, including components, hooks, and services.

Each directory is structured to separate concerns and facilitate a modular approach to development and deployment. This organization ensures that the application components are isolated and can be managed independently.

## Prerequisites

- Docker
- Docker Compose

## How to Run the Project

1. **Clone the repository**:

    ```bash
    git clone https://your-repository-url.git
    cd your-repository
    ```

2. **Build and Start the Containers**:

    Run the following command to build the Docker images and start all services:

    ```bash
    docker-compose up --build
    ```

3. **Accessing the Services**:

    - **Backend (Spring Boot)**: [http://localhost:8080](http://localhost:8080)
    - **Frontend (Next)**: [http://localhost:3000](http://localhost:3000)
    - **RabbitMQ Management Console**: [http://localhost:15672](http://localhost:15672) (Default credentials: `guest/guest`)
    - **PgAdmin**: [http://localhost:5050](http://localhost:5050) (Default credentials: `admin@admin.com/admin`)

4. **Stopping the Containers**:

    To stop all running containers, use:

    ```bash
    docker-compose down
    ```

## Docker Setup Explained

### Docker Compose

The `docker-compose.yml` defines the following services:

- **backend**: Runs the Spring Boot application. It builds the image using a multi-stage Dockerfile.
- **frontend**: Runs the React frontend.
- **rabbitmq**: A message broker used for handling messaging queues.
- **pgadmin**: A web-based administration tool for PostgreSQL.
- **db (PostgreSQL)**: The database service used by the backend.

### Backend Dockerfile

The backend Dockerfile is designed using a multi-stage build:

1. **Build Stage**:
    - Uses a Maven image to build the Spring Boot application.
    - Installs dependencies and packages the application into a JAR file.

2. **Runtime Stage**:
    - Uses a lightweight OpenJDK image to run the built JAR file.
    - Exposes port 8080.

### Environment Variables

The backend uses several environment variables for configuration, set directly in the `docker-compose.yml`. Key variables include:

- `CORS_ALLOWED_ORIGINS`: Defines allowed origins for CORS.
- `SPRING_DATASOURCE_*`: Configuration for connecting to the PostgreSQL database.
- `SPRING_RABBITMQ_*`: Configuration for connecting to RabbitMQ.

### Health Checks

The backend service includes a health check that verifies the Spring Boot application is up by checking the `/actuator/health` endpoint.

## Common Issues and Troubleshooting

- **Build Taking Too Long**: The initial Maven dependency download can take time. Subsequent builds will be faster due to Docker’s layer caching.
- **RabbitMQ or PostgreSQL Not Connecting**: Ensure that the services are correctly defined in the `docker-compose.yml` and that the backend is using the correct service names for connecting to them.

## Development Tips

- For faster development, you can use `docker-compose up --build` to rebuild only the updated services.
- Logs for each service can be viewed using:

    ```bash
    docker-compose logs -f [service-name]
    ```

## Future Features

While this project is a complete and functional application, there are several potential enhancements and features that could be added in future updates:

- **Time Range Filter for Events**: Adding functionality to filter events by a specified time range. This would allow users to view and analyze events that occurred within a specific period, enhancing data analysis capabilities.

- **Authentication and User Logins**: Implementing authentication to secure the application, requiring users to log in to access certain features. This would include user management, authentication mechanisms, and securing sensitive data.

- **Advanced Event Management**: Adding more advanced event management features, such as the ability to create, update, and delete events directly from the frontend. This could also include setting permissions for different types of events.

- **Performance Optimizations**: Enhancing the performance of both frontend and backend components, including optimizing database queries, improving response times, and reducing resource consumption.

- **Enhanced Real-Time Features**: Expanding the real-time features to include more granular updates, notifications, and interactive elements based on live data.

These features were not implemented in the initial one-day project due to time constraints. They represent potential areas for future development to enhance the functionality and usability of the application.


## License

This project is licensed under the MIT License.

## Author

- Talal Badreddine