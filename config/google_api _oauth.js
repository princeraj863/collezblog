/*const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2({

    clientID :"815581230556-sqpponqnthn8dlc87s2bul8tcovuht91.apps.googleusercontent.com",
 clientSecret:"SM7x1UBKWXPN-mFuq3ygOlph",
 callbackURL :  "https://developers.google.com/oauthplayground" // Redirect URL
});

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "princeraj863@gmail.com", 
         clientId: "815581230556-sqpponqnthn8dlc87s2bul8tcovuht91.apps.googleusercontent.com",
         clientSecret: "SM7x1UBKWXPN-mFuq3ygOlph",
         
         accessToken: "4%2F0AX4XfWhymE2xEcb0B6D2J9Zlm1D5gFKIc_b_1yAFHsNMw_HRvwbY0TI0vyReVztQ0ZdPiQ",
         tls: {
            rejectUnauthorized: false
          }
    }
});

const mailOptions = {
    from: "princeraj863@gmail.com",
    to: "princeraj873.pr2@gmail.com@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});
*/