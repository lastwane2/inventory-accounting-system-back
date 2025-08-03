import { Router, Request, Response } from "express";
import { warehouseService } from "./warehouse.service";
import { authMiddleware } from "@/auth.middleware";

const router = Router()

const warehousesService = new warehouseService()

router.post('/', authMiddleware, (req: Request, res: Response) => {
    if(!req.body?.text?.length) {
        return res.status(400).json({ message: "Text is required" })
    }

    const warehouse = warehousesService.createWarehouse(req.body)
    res.status(200).json(warehouse)
})

export const warehouseRouter = router