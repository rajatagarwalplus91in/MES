'use strict';

const { EmailTransportService } = require("./EmailTransportService");

class EmailProcessor {
    
    constructor( oEmailModel, oEmailFilter, oClientModel, oEmailAccountModel ) {
        this.oEmailModel = oEmailModel;    
        this.oEmailFilter = oEmailFilter;
        this.oClientModel = oClientModel;
        this.oEmailAccountModel = oEmailAccountModel;
    }

    async getEmailFromQueue() {
        let oCurrentDate = new Date();
        let oEmail = await this.oEmailModel.find(this.oEmailFilter.oFilter).where("this.dtScheduleAt < oCurrentDate || oCurrentDate == null").sort(this.oEmailFilter.oSort).limit(1);

        if (oEmail.length == 0) {
            return null;
        }
        return oEmail[0];
    }
    
    processQueue() {
        setInterval(async ()=>{
            let oEmail = await this.getEmailFromQueue();
            if (!oEmail) {
                return;
            }
            try {
                oEmail.sEmailStatus = "In-Process";
                let response = await oEmail.save();
            } catch (e) {
                console.error(e);
            }
            
            let oClient = await this.oClientModel.findById(oEmail.sClientID);

            if (!oClient) {
                return;
            }
            if (oClient.aAllowedEmailAccounts.length == 0) {
                return;
            }

            let oEmailAccount = await this.oEmailAccountModel.findById(oClient.aAllowedEmailAccounts[0]);

            let aEmailQueue = [];

            if (oEmail.bIsMarketingEmail) {
                let aToList = oEmail.aRecipients;
                for (let index = 0; index < aToList.length; index++) {
                    const oToItem = aToList[index];
                    let oTempEmail = JSON.parse(JSON.stringify(oEmail));
                    oTempEmail.aRecipients = [oToItem];
                    aEmailQueue.push(oTempEmail);
                }
            } else {
                aEmailQueue.push(oEmail);
            }

            let bFailed = false;
            let bSuccess = false;

            for (let index = 0; index < aEmailQueue.length; index++) {
                const oEmailQueueItem = aEmailQueue[index];
                let oEmailTransportService = new EmailTransportService(oEmailQueueItem, oEmailAccount.aCredentials[0]);
                let bResponse = await oEmailTransportService.sendEmail();    
                if (bResponse) {
                    bSuccess = true;
                } else {
                    bFailed = true;
                }
                
            }
            
            if (bSuccess && !bFailed) {
                oEmail.sEmailStatus = "Sent";
                let response = await oEmail.save();
            } else if (bSuccess && bFailed) {
                oEmail.sEmailStatus = "Partially Failed";
                let response = await oEmail.save();
            } else {
                oEmail.sEmailStatus = "Failed";
                let response = await oEmail.save();
            }

        }, 1000);
    }
}   
    
module.exports = { EmailProcessor }