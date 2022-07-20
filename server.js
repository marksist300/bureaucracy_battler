const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require('dotenv').config();
const O_AUTH_ID = process.env.O_AUTH_ID;
const O_AUTH_SECRET = process.env.O_AUTH_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const O_Auth_2 = google.auth.OAuth2;
console.log(O_AUTH_ID)
const oAuth2Client = new O_Auth_2(O_AUTH_ID, O_AUTH_SECRET)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(name,receiver){
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'marklinndev@gmail.com',
                clientId: O_AUTH_ID,
                clientSecret: O_AUTH_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        })

    const mailOptions = {
        from: `marklinndev@gmail.com <marktlinn@gmail.com>`,
        to: 'marktlinn@gmail.com',
        subject: 'Testing',
        text: 'Testing the gmail email app I\'m building'
    };

    const send = await transport.sendMail(mailOptions, (error,result)=>{
        if(error) {
            console.log(`Error with send function: ${error}`)
        }
        else {
            console.log(result)
        }
        transport.close()
    });

    } catch (error) {
        return `Error with sendMail: ${error}`
    }
}

sendMail().then(result=> console.log(`Email sent: ${result}`))
    .catch(error=> console.log(`Error sending: ${error}`))