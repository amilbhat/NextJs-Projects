import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}, {new: true, runValidators: true})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}, {new: true, runValidators: true})
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASS
            }
          });

          const mailOptions = {
            from: "authenter@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your email" : "Reset Your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${ emailType === "VERIFY" ? "Verify Your email" : "Reset Your password"}
              or copy and paste the link below in your browser. <br>
              ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailresponse = await transport.sendMail(mailOptions)
          return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}