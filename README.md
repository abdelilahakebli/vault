# Vault - In-Memory Key-Value Pair Database

Vault is a lightweight, in-memory key-value pair database for Node.js written in TypeScript. It utilizes the Node.js crypto module to provide basic encryption and decryption of stored values, ensuring data security.

## Features

- **In-Memory Storage**: Vault stores key-value pairs in memory, making it suitable for small-scale applications that require a simple and fast data store.

- **Encryption**: All stored values are encrypted using the Advanced Encryption Standard (AES) algorithm in CBC mode, providing a layer of security for sensitive data.

- **Hashing**: The secret key is hashed using the SHA-256 algorithm, and the secret initialization vector (IV) is hashed using the MD5 algorithm.

## Installation

To use Vault in your Node.js project, install it using npm:

```bash
npm install @abdelilahakebli/vault
```

## Usage

```javascript
const Vault = require("@abdelilahakebli/vault")

// Create a new Vault instance with a secret key
const vault = new Vault("your-secret-key");

// Set a key-value pair
const encryptedValue = vault.set("username", "john_doe");
console.log("Encrypted Value:", encryptedValue);

// Retrieve a value
const decryptedValue = vault.get("username");
console.log("Decrypted Value:", decryptedValue);

// Delete a key-value pair
const isDeleted = vault.delete("username");
console.log("Deleted:", isDeleted);
```

## API

### `constructor(secret_key: string, secret_iv?: string)`

- `secret_key`: The secret key used for encryption.
- `secret_iv`: (Optional) The secret initialization vector (IV) used for encryption. If not provided, a random IV will be generated.

### `set(key: string, value: string): string`

- Encrypts and stores the value associated with the given key. Returns the encrypted value.

### `get(key: string): string`

- Retrieves the decrypted value associated with the given key.

### `delete(key: string): boolean`

- Deletes the key-value pair associated with the given key. Returns `true` if the deletion is successful, otherwise `false`.

## Contributing

Contributions are welcome! Feel free to open issues, submit pull requests, or suggest new features.

## License

This project is licensed under the [MIT License](LICENSE).