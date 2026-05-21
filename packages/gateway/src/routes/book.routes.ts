import { Router } from "express";
import { BookController } from "../controllers/book.controller";

const router = Router();

router.post("/", BookController.create);
router.get("/:id", BookController.getById);
router.put("/:id", BookController.update);
router.delete("/:id", BookController.delete);
router.get("/", BookController.list);

export default router;
