const PhoneMessageSender = require('alidayu-node');
const errs = require('errs');

module.exports = function (appKey, appSecret, options) {
    this.sender = new PhoneMessageSender(appKey, appSecret);

    this.send = function (par, mobile,sendType) {
        return new Promise((resolve, reject) => {
            console.log((options && options['templates'][sendType]));
            this.sender.smsSend({
                sms_free_sign_name:(options && options['sign']),
                sms_param: par,
                rec_num: mobile,
                sms_template_code: (options && options['templates'][sendType])
            }, sendResult => {
                if (sendResult['error_response']) {
                    reject(errs.create({
                        code: 'SEND_VALID_CODE_FAILED',
                        status: 401,
                        statusCode: 401,
                        message: 'send failed'
                    }));
                } else {
                    resolve();
                }
            });
        });
    };
};
