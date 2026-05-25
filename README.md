# 📚 Author gRPC Service

> A modern, high-performance gRPC-based microservice for managing author data with Express.js gateway integration

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![gRPC](https://img.shields.io/badge/gRPC-Latest-blue)](https://grpc.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-brightgreen)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.x-yellow)](https://expressjs.com/)

## ✨ Features

- 🚀 **High-Performance gRPC** - Ultra-fast communication with protocol buffers
- 📦 **Protocol Buffers** - Efficient serialization and schema definition
- 🗄️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- 🌐 **Express Gateway** - REST API gateway for gRPC services
- 🔄 **Full CRUD Operations** - Create, Read, Update, and Delete authors
- 🐳 **Docker Support** - Containerized deployment ready
- 🔧 **Hot Reload Development** - Automatic restart with Nodemon

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4+) - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **npm** (v9+) - Comes with Node.js
- **Docker & Docker Compose** (optional) - For containerized deployment

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Author-gRPC
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=50052
GATEWAY_PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/author-grpc
# Or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/author-grpc
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or using Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Run the Application

#### Development Mode (with auto-reload):

**Start gRPC Server:**
```bash
npm run grpc
```

**In another terminal, start Express Gateway:**
```bash
npm run gateway
```

#### Using Docker Compose:

```bash
docker-compose up -d
```

## 📖 API Reference

### gRPC Service Methods

#### 1. **Create Author**
```proto
rpc CreateAuthor (AuthorRequest) returns (AuthorResponse) {}
```

**Request Parameters:**
- `id` (string): Unique author identifier
- `name` (string): Author's full name
- `age` (int32): Author's age
- `books` (repeated string): List of book titles

#### 2. **Get Author**
```proto
rpc GetAuthor (AuthorId) returns (AuthorResponse) {}
```

**Request Parameters:**
- `id` (string): Author's unique ID

#### 3. **Update Author**
```proto
rpc UpdateAuthor (AuthorRequest) returns (AuthorResponse) {}
```

**Request Parameters:**
- `id`, `name`, `age`, `books` (same as CreateAuthor)

#### 4. **Delete Author**
```proto
rpc DeleteAuthor (AuthorId) returns (DeleteResponse) {}
```

**Request Parameters:**
- `id` (string): Author's unique ID

#### 5. **List All Authors**
```proto
rpc ListAuthors (Empty) returns (AuthorList) {}
```

### REST API Gateway Endpoints

The Express gateway provides REST endpoints that communicate with the gRPC service:

```
GET    /api/authors          - List all authors
POST   /api/authors          - Create new author
GET    /api/authors/:id      - Get specific author
PUT    /api/authors/:id      - Update author
DELETE /api/authors/:id      - Delete author
```

**Example Usage:**

```bash
# Create author
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "id": "author-001",
    "name": "Bishnu Yadav",
    "age": 21,
    "books": ["Pride and Prejudice", "Sense and Sensibility"]
  }'

# Get author
curl http://localhost:3000/api/authors/author-001

# Update author
curl -X PUT http://localhost:3000/api/authors/author-001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bishnu Yadav",
    "age": 21,
    "books": ["Pride and Prejudice", "Sense and Sensibility", "Emma"]
  }'

# Delete author
curl -X DELETE http://localhost:3000/api/authors/author-001

# List all authors
curl http://localhost:3000/api/authors
```

## 📁 Project Structure

```
Author-gRPC/
├── 📄 package.json              # Project dependencies and scripts
├── 📄 Dockerfile                # Docker image configuration
├── 📄 docker-compose.yml        # Docker Compose orchestration
├── 📄 README.md                 # This file
│
├── 📁 protos/
│   └── authors.proto            # Protocol Buffer definitions
│
├── 📁 client/
│   └── client.js                # gRPC client for testing
│
└── 📁 server/
    ├── 📄 server.js             # gRPC server entry point
    ├── 📄 gateway.js            # Express.js REST gateway
    ├── 📄 db.js                 # MongoDB connection setup
    │
    ├── 📁 models/
    │   └── Author.js            # Mongoose Author schema
    │
    └── 📁 services/
        └── authorService.js     # Business logic & RPC handlers
```

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **gRPC** | Latest | RPC framework |
| **Protocol Buffers** | proto3 | Data serialization |
| **Express.js** | 5.x | REST API gateway |
| **MongoDB** | 4.4+ | Database |
| **Mongoose** | 9.x | MongoDB ODM |
| **Nodemon** | 3.x | Development auto-reload |
| **Docker** | Latest | Containerization |

## 🔧 Development Scripts

```bash
# Start gRPC server with auto-reload
npm run grpc

# Start Express gateway with auto-reload
npm run gateway

# Run tests (when configured)
npm test
```

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t author-grpc:latest .
```

### Run Container

```bash
docker run -p 50052:50052 -p 3000:3000 --env-file .env author-grpc:latest
```

### Using Docker Compose (Recommended)

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📝 Configuration

### Environment Variables

```env
PORT=50052                    # gRPC server port
GATEWAY_PORT=3000            # Express gateway port
MONGODB_URI=mongodb://...    # MongoDB connection string
NODE_ENV=development         # Environment mode
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env` file
- Verify database credentials (if using MongoDB Atlas)

### Port Already in Use
```bash
# Change ports in .env or use lsof to find process
lsof -i :50052
lsof -i :3000
```

### gRPC Connection Refused
- Verify gRPC server is running: `npm run grpc`
- Check firewall settings
- Ensure correct port configuration

## 📚 Learning Resources

- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://developers.google.com/protocol-buffers)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the `package.json` file for details.

## 👨‍💼 Author

**Bishnu Kumar Yadav**
- GitHub: [@bishnukumaryadav](https://github.com/bishnuu72)

## 🙏 Acknowledgments

- gRPC team for the excellent RPC framework
- MongoDB for reliable database solutions
- Express.js community for the powerful web framework

---

<div align="center">

**[⬆ back to top](#-author-grpc-service)**

Made with ❤️ by the Development Team - Bishnu & Ankit

</div>
