import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const encodePayload = (payload) => jwt.sign(payload, JWT_SECRET);

export const decodePayload = (payload) => jwt.decode(payload, JWT_SECRET);
