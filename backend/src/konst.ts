import bcrypt from "bcrypt";

const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS || "10", 10);
const SALT: string = bcrypt.genSaltSync(SALT_ROUNDS);

const JWT_SECRET: string = process.env.JWT_SECRET || "private.key";

export { JWT_SECRET, SALT, SALT_ROUNDS };
