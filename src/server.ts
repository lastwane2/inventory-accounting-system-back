import express, {Request, Response} from "express"
import { warehouseRouter } from "./warehouses/warehouse.controller"

const app = express()

async function main() {
    app.use(express.json())

    app.use('/api/warehouses', warehouseRouter)

	app.listen(4200, () => {
		console.log("running on 4200")
	})
}

main()