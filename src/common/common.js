const uuid = require('node-uuid');


const isBase64 = require('is-base64');

const Address = {
	'_id': {
		type: String,
		default: uuid.v4
	},
	'sAddressLine1': {
		type: String
	},
	'sAddressLine2': {
		type: String
	},
	'sLocality': {
		type: String
	},
	'sCity': {
		type: String
	},
	'sState': {
		type: String
	},
	'sCountry': {
		type: String
	},
	'sPIN': {
		type: String
	}
}
const File = {
	'sFileID': {
		type: String
	},
	'sType': {
		type: String
	},
	'sSize': {
		type: String
	},
	'sContent': {
		type: String
	},
	'sName': {
		type: String
	}
}

const EmailRecipient = {
	'sName': {
		type: String
	},
	'sEmail': {
		type: String
	} 
}

const EmailAttachment = {
	'sFileName': {
		'type': String,
		'required': true
	},
	'sFileContent': {
		'type': String,
		'required': true,
		'validate': {
			validator: function(sContent) {
				return isBase64(sContent);
			},
			message: 'Attachment is not a valid base64 content'
		}
	}
}


const SMTPEmailCredential = {
	'sHostName': {
		'type': String,
		'required': true
	},
	'sPort': {
		'type': String,
		'required': true
	},
	'sSecureProtocol': {
		'type': String,
		'required': true,
		'enum': ['ssl', 'tls']
	},
	'bSMTPAuthRequired': {
		'type': String,
		'required': true,
		'default': true
	},
	'sUsername': {
		'type': String,
		'required': true
	},
	'sPassword': {
		'type': String,
		'required': true
	}
}


module.exports = {
    Address,
    File,
	EmailRecipient,
	EmailAttachment,
	SMTPEmailCredential
};