import { Login, LoginRes } from "./login.interface";

export interface Adaptor {
    adapt(data:Login):LoginRes
}
