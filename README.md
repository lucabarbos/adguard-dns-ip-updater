# AdGuard DNS IP Updater

AdGuard DNS IP Updater is a Node.js application designed to automatically update your IP address with AdGuard DNS. This is particularly useful for users with dynamic IP addresses who want to maintain a consistent DNS configuration.

## Features

- Automatically updates your IP address with AdGuard DNS at regular intervals
- Configurable update frequency
- Docker support for easy deployment
- Logging functionality for tracking updates and troubleshooting

## Prerequisites

- Node.js (version 14 or later)
- Docker (optional, for containerized deployment)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/lucabarbos/adguard-dns-ip-updater.git
   cd adguard-dns-ip-updater
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

Create a `.env` file based on `.env.example`:

```
URL_TO_PING=https://linkip.adguard-dns.com/linkip/your-adguard-dns-token
INTERVAL_MS=3600000
```

Replace `your-adguard-dns-token` with your actual AdGuard DNS token. The `INTERVAL_MS` value is set to 1 hour (3600000 milliseconds) by default, but you can adjust this as needed.

## Usage

### Running with Node.js

To start the application, run:

```
npm run start
```

### Running with Docker

1. Build the Docker image:
   ```
   docker build -t adguard-dns-ip-updater .
   ```

2. Run the Docker container:
   ```
   docker run -d --name adguard-dns-updater --env-file .env adguard-dns-ip-updater
   ```

## Docker Compose

If you prefer using Docker Compose, you can use the following `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  adguard-dns-updater:
    build: .
    environment:
      - URL_TO_PING=${URL_TO_PING}
      - INTERVAL_MS=${INTERVAL_MS:-3600000}
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
```

To start the service using Docker Compose, run:

```
docker-compose up -d
```

## Logs

Logs are stored in the `logs` directory. You can view the logs by checking the `app.log` file in this directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to AdGuard for providing the DNS service and API.
- This project was inspired by the need for a simple, reliable way to keep dynamic IP addresses updated with AdGuard DNS.
