const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const authorService = require('./services/authorService.js');
const dotenv = require("dotenv");
dotenv.config();
require("./db.js");
const port=process.env.PORT || 50052;

const PROTO_PATH = path.join(__dirname, '..', 'protos', 'authors.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const authorProto = protoDescriptor.authors;

function main() {
  const server = new grpc.Server();

  server.addService(authorProto.AuthorService.service, authorService);

  const address = `0.0.0.0:${port}`;
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Server binding error:", err);
      return;
    }
    console.log(`Server running at ${address}`);
  });
}

main();
