import { DB_URI } from '@/config';
import { createConnection } from 'mongoose';

export const connections = {
  DEFAULT: createConnection(DB_URI),
};
