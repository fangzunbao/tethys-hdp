import * as crypto from 'crypto';

export function WXBizDataCrypt(appId, sessionKey): void {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv): any {
  let sessionkey = Buffer.from(this.sessionKey, 'base64');
  encryptedData = Buffer.from(encryptedData, 'base64');
  iv = Buffer.from(iv, 'base64');

  try {
    // 解密
    let decipher = crypto.createDecipheriv('AES-128-CBC', sessionkey, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'binary', 'utf-8');
    decoded += decipher.final('utf-8');
    decoded = JSON.parse(decoded);
    return decoded;
  } catch (error) {
    throw new Error('Illegal buffer');
  }
};
