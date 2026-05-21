import { Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import { BookService } from "../services/book.service";

export const BookController = {
    create: (req: Request, res: Response) => {
        BookService.create(req, (err:any, response:any) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(response);
        });
    },

    getById: (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid book ID" });

        BookService.getById(req, (err:any, response:any) => {
            if (err) {
                const status = err.code === grpc.status.NOT_FOUND ? 404 : 500;
                return res.status(status).json({ error: err.message });
            }
            res.json(response);
        });
    },

    update: (req: Request, res: Response) => {
        BookService.update(req, (err:any, response:any) => {
            if (err) {
                const status = err.code === grpc.status.UNAUTHENTICATED ? 401 : 500;
                return res.status(status).json({ error: err.message });
            }
            res.json(response);
        });
    },

    delete: (req: Request, res: Response) => {
        BookService.delete(req, (err:any) => {
            if (err) {
                const status = err.code === grpc.status.UNAUTHENTICATED ? 401 : 500;
                return res.status(status).json({ error: err.message });
            }
            res.status(204).send();
        });
    },

    list: (req: Request, res: Response) => {
        BookService.list(req, (err:any, response:any) => {
            if (err) {
                const status = err.code === grpc.status.UNAUTHENTICATED ? 401 : 500;
                return res.status(status).json({ error: err.message });
            }
            res.json(response);
        });
    }
};
