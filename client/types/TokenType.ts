
export type DecodedToken = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    username: string;
    flat_id: number | null;
}
