import * as nodemailer from 'nodemailer'

const emailService = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_PROVIDER_USERNAME,
    pass: process.env.PASSWORD_PROVIDER_USERNAME,
  },
})

export const sendEmailVerification = async (email: string, code: string) => {
  await emailService.sendMail({
    from: process.env.EMAIL_PROVIDER_USERNAME,
    to: email,
    subject: 'Verify Email',
    html: `<div><h1>Your verification code is: ${code} </h1></div>`,
  })
}
