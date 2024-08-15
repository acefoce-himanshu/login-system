import { UserDoc } from './db/user.schema';

declare global {
  namespace Express {
    export interface Request {
      userInfo?: UserDoc;
    }
  }
}
