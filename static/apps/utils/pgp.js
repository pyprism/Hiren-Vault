/**
 * Created by prism on 7/15/16.
 */
const openpgp = require('openpgp');
openpgp.initWorker({ path: '../../static/bower/openpgp/dist/openpgp.worker.min.js' });
openpgp.config.aead_protect = true;
openpgp.config.use_native = true;

export async function encrypt(password, data) {
    var options = {
        data: data,
        passwords: [password]
    };

    let encrypt = await openpgp.encrypt(options);
    return encrypt.data;
}

export async function decrypt(password, data) {
    var options = {
        message: openpgp.message.readArmored(data), // parse encrypted bytes
        password: [password]                 // decrypt with password
    };

    let decrypt = await openpgp.decrypt(options);
    return decrypt.data;
}
