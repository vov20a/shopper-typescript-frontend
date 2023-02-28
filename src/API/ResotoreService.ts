import axios from "../axios";
import { CreatePassordType, CreateResultType, RestorePassordType } from "../types/data";

export class RestoreService {

    static fetchRestorePassword = async (params: RestorePassordType) => {
        try {
            const { data } = await axios.post<RestorePassordType>('/auth/restore', params);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return error
            }
        }
        return null;
    };


    static fetchUpdatePassword = async (params: CreatePassordType) => {
        try {
            const { data } = await axios.post<CreateResultType>('/auth/password', params);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return error
            }
        }
        return null;
    };

}
