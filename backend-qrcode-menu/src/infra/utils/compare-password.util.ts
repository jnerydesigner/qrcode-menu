import * as bcrypt from 'bcrypt';

export const ComparePasswordUtil = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}