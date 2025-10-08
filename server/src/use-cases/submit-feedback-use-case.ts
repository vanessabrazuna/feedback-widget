import type { MailAdapter } from "../adapters/mail-adapter.js"
import type { FeedbacksRepository } from "../repositories/feedbacks-repository.js"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string | null
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot: screenshot ?? null,
    })

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>',
      ].join('\n'),      
    })
  }
}