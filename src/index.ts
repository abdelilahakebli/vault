import * as crypto from "crypto";

class Vault {
    secret_key: Buffer
    algorithm: string
    secret_iv : Buffer
    data: Map<string, string>

    constructor(secret_key: string, secret_iv: string = ""){
        this.secret_key = Buffer.from(this.createHash( "sha256", secret_key), 'hex')
        this.secret_iv = !secret_iv ? this.secret_iv = crypto.randomBytes(16) : Buffer.from(this.createHash( "md5", secret_iv), "hex")
        this.data = new Map<string, string>()
        this.algorithm = "aes-256-cbc"
        

    }
    

    set(key: string, value: string): string{
        let encrypted = this.encrypt(value)
        this.data.set(key, encrypted)
        return encrypted
    }

    get(key:string): string {
        let encrypted = this.data.get(key)
        if (!encrypted) return ""
        let decrypted = this.decrypt(encrypted)
        return decrypted
    }

    delete(key: string): boolean {
        return this.data.delete(key)
    }

    createHash(algorithm:string ,secret_key: string): string {
        let hash = crypto
                    .createHash(algorithm)
                    .update(secret_key)
                    .digest("hex")
        
        return hash
    }


    encrypt(data:string): string {
        let cipher = crypto.createCipheriv(this.algorithm, this.secret_key, this.secret_iv)
        let encrypted = cipher.update(data, 'utf-8', 'hex')
        encrypted += cipher.final("hex")
        return encrypted
    }

    decrypt(encrypted: string): string {
        let decipher = crypto.createDecipheriv(this.algorithm, this.secret_key, this.secret_iv)
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
        decrypted += decipher.final("utf-8")
        return decrypted
    }

}


export default Vault;
