"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class Vault {
    constructor(secret_key, secret_iv = "") {
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
exports.default = Vault;
