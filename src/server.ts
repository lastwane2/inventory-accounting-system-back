import express, {Request, Response} from "express"

const app = express()

async function main() {
    app.use(express.json())

    app.get('/api', (req: Request, res: Response) => {
        res.json({message: 'hi!'}).status(200)
    })

	app.listen(4200, () => {
		console.log("running on 4200")
	})
}

main()