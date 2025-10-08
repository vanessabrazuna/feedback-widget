import nodemailer from 'nodemailer'
import type { MailAdapter, SendMailData } from '../mail-adapter.js'

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b13be2651a1254",
    pass: "****79a3",
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: "Vanessa Brazuna <brazuna.nessa@gmail.com>",
      subject,
      html: body,
    })
  }
}