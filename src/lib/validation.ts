import { z } from 'zod';

export const titleSchema = z
    .string()
    .trim()
    .min(1, 'Titill má ekki vera tómur.')
    .max(255, 'Titill má að hámarki vera 255 stafir.');