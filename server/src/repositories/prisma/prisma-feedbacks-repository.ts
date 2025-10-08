import { prisma } from "../../prisma.js"
import type { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository.js"

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot: screenshot ?? null, 
      },
    });
  }
}