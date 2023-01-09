'use strict';

const nodemailer = require("nodemailer");


class EmailTransportService {
    
    constructor( oEmail, oCredentials ) {
        this.oEmail = oEmail;    
        this.oCredentials = oCredentials;
    }

    async sendEmail() {

        let bSecure = false;
        if (this.oCredentials.sSecureProtocol == "ssl" /*|| this.oCredentials.sSecureProtocol == "tls"*/) {
            bSecure = true;
        }

        let transporter = nodemailer.createTransport({
            host: this.oCredentials.sHostName,
            port: this.oCredentials.sPort,
            secure: bSecure, 
            auth: {
              user: this.oCredentials.sUsername,
              pass: this.oCredentials.sPassword,
            },
          });

          let aToList = [];
          for(var iii=0;iii < this.oEmail.aRecipients.length; iii++ ) {
              aToList.push(this.formatEmailAddress(this.oEmail.aRecipients[iii]));
          }

          let aCCList = [];
          for(var iii=0;iii < this.oEmail.aCCRecipients.length; iii++ ) {
            aCCList.push(this.formatEmailAddress(this.oEmail.aCCRecipients[iii]));
          }

          let aBCCList = [];
          for(var iii=0;iii < this.oEmail.aBCCRecipients.length; iii++ ) {
            aBCCList.push(this.formatEmailAddress(this.oEmail.aBCCRecipients[iii]));
          }
 
          let aAttachments = this.oEmail.aAttachments.map(function(a){ 
            return {
              filename: a.sFileName,
              content: a.sFileContent,
              encoding: 'base64'
            };
          });


          try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: this.oEmail.oSender.sEmail, // sender address
                to: aToList.join(", "), 
                cc: aCCList.join(", "),
                bcc: aBCCList.join(", "),  
                subject: this.oEmail.sEmailSubject, // Subject line
                html: this.oEmail.sEmailBody, // html body
                attachments: aAttachments
            });

            console.log("Message sent: %s", info.messageId);

            return true;
        } catch (e) {
            console.error("Failed to send email:");
            console.error(e);
            return false;
        }
    }

    formatEmailAddress(oEmailAddress) {
        return oEmailAddress.sName + " <" + oEmailAddress.sEmail + "> ";
    }
}   
    
module.exports = { EmailTransportService }