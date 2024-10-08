import { CompactEncrypt, compactDecrypt } from 'jose';

const SECRET_KEY_STRING = process.env.NEXT_PUBLIC_SECRET_KEY || '12345678901234567890123456789012'; // Ensure 32-byte length for AES-256
const SECRET_KEY = new TextEncoder().encode(SECRET_KEY_STRING);

export const encryptData = async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const plaintext = encoder.encode(data);

    const jwe = await new CompactEncrypt(plaintext)
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .encrypt(SECRET_KEY);

    return jwe;
};

export const decryptData = async (encryptedData: string): Promise<string> => {
    const { plaintext } = await compactDecrypt(encryptedData, SECRET_KEY);
    const decoder = new TextDecoder();
    return decoder.decode(plaintext);
};