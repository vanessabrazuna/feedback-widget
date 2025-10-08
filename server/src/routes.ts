import express from "express"
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case.js"
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository.js"
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter.js"

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
	const { type, comment, screenshot } = req.body

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
	const nodemailerMailAdapter = new NodemailerMailAdapter()

	const submitdFeedbackUseCase = new SubmitFeedbackUseCase(
		prismaFeedbacksRepository,
		nodemailerMailAdapter,
	)

	await submitdFeedbackUseCase.execute({
		type,
		comment,
		screenshot,
	})

	return res.status(201).send()
})