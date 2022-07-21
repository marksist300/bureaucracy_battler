const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const express = require("express")
const app = express();
require('dotenv').config();
const PORT = 3000;

const O_AUTH_ID = process.env.O_AUTH_ID;
const O_AUTH_SECRET = process.env.O_AUTH_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const O_Auth_2 = google.auth.OAuth2;
// const oAuth2Client = new O_Auth_2(O_AUTH_ID, O_AUTH_SECRET, REDIRECT_URL)
// oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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
app.get("/", (req,res)=>{
    res.sendFile(`${__dirname}/view/index.html`)
})
app.post("/login", (req,res)=>{
    // res.send("<h1>hello<h1>")
    // console.log(req)
    res.sendFile(`${__dirname}/view/index.html`)
    const oAuth2Client = new O_Auth_2(O_AUTH_ID, O_AUTH_SECRET, REDIRECT_URL)
    const scopes = [
        'https://www.googleapis.com/auth/drive.metadata.readonly'
      ];
    const authorizationUrl = oAuth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
        /** Pass in the scopes array defined above.
          * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
    });
    console.log('In progress...', res.body)
    res.redirect(authorizationUrl);
})

app.listen(PORT, ()=>{
    console.log(`Server live on port: ${PORT}`)
    }
)

// sendMail().then(result=> console.log(`Email sent: ${result}`))
//     .catch(error=> console.log(`Error sending: ${error}`))
// Send mail function working.

