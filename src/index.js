import * as crypto from "crypto";
class Vault {
    constructor(secret_key, secret_iv = null) {
        this.secret_key = Buffer.from(this.createHash("sha256", secret_key), 'hex');
        this.secret_iv = !secret_iv ? this.secret_iv = crypto.randomBytes(16) : Buffer.from(this.createHash("md5", secret_iv), "hex");
        this.data = new Map();
        this.algorithm = "aes-256-cbc";
    }
    set(key, value) {
        let encrypted = this.encrypt(value);
        this.data.set(key, encrypted);
        return encrypted;
    }
    get(key) {
        let encrypted = this.data.get(key);
        if (!encrypted)
            return "";
        let decrypted = this.decrypt(encrypted);
        return decrypted;
    }
    delete(key) {
        return this.data.delete(key);
    }
    createHash(algorithm, secret_key) {
        let hash = crypto
            .createHash(algorithm)
            .update(secret_key)
            .digest("hex");
        return hash;
    }
    encrypt(data) {
        let cipher = crypto.createCipheriv(this.algorithm, this.secret_key, this.secret_iv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final("hex");
        return encrypted;
    }
    decrypt(encrypted) {
        let decipher = crypto.createDecipheriv(this.algorithm, this.secret_key, this.secret_iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final("utf-8");
        return decrypted;
    }
}
export default Vault;
//# sourceMappingURL=index.js.map