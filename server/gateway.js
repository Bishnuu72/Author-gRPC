const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Load proto
const PROTO_PATH = path.join(__dirname,"..", "protos", "authors.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDesc = grpc.loadPackageDefinition(packageDef);
const authorProto = protoDesc.authors;

// gRPC Client (connects to your server.js)
const client = new authorProto.AuthorService(
  `0.0.0.0:${process.env.PORT || 50052}`,
  grpc.credentials.createInsecure()
);

// ---------------------------
// REST → gRPC ROUTES
// ---------------------------

// Create Author
app.post("/authors", (req, res) => {
  client.CreateAuthor(req.body, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

// Get Author by ID
app.get("/authors/:id", (req, res) => {
  client.GetAuthor({ id: req.params.id }, (err, response) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(response);
  });
});

// Update Author
app.put("/authors/:id", (req, res) => {
  const data = { id: req.params.id, ...req.body };

  client.UpdateAuthor(data, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

// Delete Author
app.delete("/authors/:id", (req, res) => {
  client.DeleteAuthor({ id: req.params.id }, (err, response) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(response);
  });
});

// List All Authors
app.get("/authors", (req, res) => {
  client.ListAuthors({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

// Start Gateway Server
const GATEWAY_PORT = process.env.GATEWAY_PORT || 3000;

app.listen(GATEWAY_PORT, () => {
  console.log(`API Gateway running on port ${GATEWAY_PORT}`);
});
