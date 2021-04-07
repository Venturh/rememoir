import * as nodemailer from 'nodemailer'

const emailService = nodemailer.createTransport({
  host:
    process.env.ENV === 'development'
      ? 'smtp.ethereal.email'
      : 'smtp-mail.outlook.com',
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

export const sendPasswordReset = async (email: string, link: string) => {
  await emailService.sendMail({
    from: process.env.EMAIL_PROVIDER_USERNAME,
    to: email,
    subject: 'Reset Password',
    html: `<div><a href="${link}">Reset Password</a></div>`,
  })
}

export const sendEmailChange = async (email: string, link: string) => {
  await emailService.sendMail({
    from: process.env.EMAIL_PROVIDER_USERNAME,
    to: email,
    subject: 'Change Email',
    html: `<div><a href="${link}">Cofirm change Password</a></div>`,
  })
}
