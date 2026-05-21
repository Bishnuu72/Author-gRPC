import { client } from "../grpcClient";
import { createMetadata } from "../middlewares/authMetadata";

export const BookService = {
    create: (req:any, callback:any) => {
        const metadata = createMetadata(req);
        client.CreateBook(req.body, metadata, callback);
    },

    getById: (req:any, callback:any) => {
        const metadata = createMetadata(req);
        client.GetBook({ id: Number(req.params.id) }, metadata, callback);
    },

    update: (req:any, callback:any) => {
        const metadata = createMetadata(req);
        const payload = { id: Number(req.params.id), ...req.body };
        client.UpdateBook(payload, metadata, callback);
    },

    delete: (req:any, callback:any) => {
        const metadata = createMetadata(req);
        const payload = { id: Number(req.params.id) };
        client.DeleteBook(payload, metadata, callback);
    },

    list: (req:any, callback:any) => {
        const metadata = createMetadata(req);
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        client.ListBooks({ page, pageSize }, metadata, callback);
    }
};
