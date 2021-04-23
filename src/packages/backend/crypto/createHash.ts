import { createHash } from "crypto";

export const sha256 = (data: any): string => {
    return createHash('sha256').update(data).digest('hex');
}