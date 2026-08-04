export declare class BcryptHelper {
    private static readonly SALT_ROUNDS;
    static hash(password: string): Promise<string>;
    static compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=bcrypt.d.ts.map