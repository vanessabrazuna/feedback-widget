import express from "express"
import nodemailer from "nodemailer"
import { prisma } from "./prisma.js"

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "b13be2651a1254",
		pass: "****79a3",
	},
})

app.post("/feedbacks", async (req, res) => {
	const { type, comment, screenshot } = req.body

	const feedback = await prisma.feedback.create({
		data: {
			type,
			comment,
			screenshot,
		},
	})

	await transport.sendMail({
		from: "Equipe Feedget <oi@feedget.com>",
		to: "Vanessa Brazuna <brazuna.nessa@gmal.com>",
		subject: "Novo feedback",
		html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
		].join("\n"),
	})

	return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
	console.log("Server is running on http://localhost:3333")
})
