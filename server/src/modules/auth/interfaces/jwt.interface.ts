export interface JwtPayload {
  email: string;
}

export interface JwtToken {
  expiresIn: number;
  token: string;
}
