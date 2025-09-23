# SpotBooker
An ticketing and reservations website

## Project Overview

SpotBooker is a comprehensive full-stack web application designed as a modern ticketing and event reservation platform that connects event organizers (merchants) with customers seeking entertainment experiences. The platform enables merchants to create and manage events across various categories including concerts, sports games, and theater performances, while providing customers with an intuitive interface to discover, browse, and purchase tickets for live events. Built with a clean separation of concerns using vanilla JavaScript for the frontend and PHP with MySQL for the backend, SpotBooker features user authentication with role-based access control distinguishing between customers and merchants, real-time event management with ticket availability tracking, integrated payment processing through Ethereum blockchain transactions via MetaMask, dynamic content carousels for showcasing top events and categories, comprehensive event filtering and search capabilities, and a responsive design optimized for both desktop and mobile experiences. The application employs a RESTful API architecture with CORS-enabled endpoints for seamless data exchange, utilizes Docker containerization for consistent development and deployment environments, and implements secure password hashing and session management to ensure user data protection while providing a scalable foundation for expanding into a full-featured event ticketing ecosystem.

## Running

### Frontend
Serve the files in the frontend directory using your favorite web server

```bash
python3 -m http.server --directory frontend 8081
```

### Backend
Run the `docker-compose.yml` file. Make sure you've installed both Docker and docker-compose on your system.

```bash
cd backend
docker compose up --build
```
Unless there are changes in the schema of the database, there is no need to rebuild the image. you can leave it running while you code.
