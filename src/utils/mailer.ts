import nodemailer from 'nodemailer'

import {createTransport} from "../config/mail-transport";

export async function sendVerificationEmail(email:string,link:string) {
  const transporter = await createTransport()
try{ 
    await transporter.sendMail({
from:process.env.EMAIL_USER,
to:email,
subject:'verify email',
html:`
<h2>welcome</>
<p>verify your email on this link</p>
<a href="${link}">${link}</a>
<p>this link expire in 24 hours.</p>
`,
})
}catch(error){
  console.error('failed to sending verification emeil:',error)
  throw new Error('Reset email could not be send please try again')
}

}

export async function sendResetPasswordEmail (email: string, resetLink: string)  {
  const  transporter = await createTransport();
try{
    await transporter.sendMail({
from:process.env.EMAIL_USER,
to:email,
subject:'reset password',
html:`
<h2>Reset password her</h2>
<a href="${resetLink}">${resetLink}</a>
<p>link will be expired in 24 hours</p>
`
  })
}catch(error){
  console.error('failed sending reset password email:',error);
  throw new Error('password can not be reseted please try again')
}

}



