import * as grpc from "@grpc/grpc-js";

export function createMetadata(req: any) {
    const metadata = new grpc.Metadata();
    const authHeader = req.headers["authorization"];
    if (authHeader) metadata.set("authorization", authHeader);
    return metadata;
}
