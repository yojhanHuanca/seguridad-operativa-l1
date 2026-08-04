import bcrypt from "bcrypt";
export class BcryptHelper {
    static SALT_ROUNDS = 10;
    static async hash(password) {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
    static async compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
//# sourceMappingURL=bcrypt.js.map