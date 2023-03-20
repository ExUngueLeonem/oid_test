import { AxiosError } from "axios";

export function errorCatch(error: AxiosError<any>) {
    if (error) {
        console.error("login", error.message)
    }
}