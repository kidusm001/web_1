# SpotBooker
An ticketing and reservations website

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
