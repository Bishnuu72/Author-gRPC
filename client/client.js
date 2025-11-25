const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '..', 'protos', 'authors.proto');

const def = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(def);

const client = new proto.authors.AuthorService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

module.exports = client;
