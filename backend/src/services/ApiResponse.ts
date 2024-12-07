class ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    successCode: boolean;

    constructor(statusCode: number, data: T, message: string = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.successCode = statusCode < 400;
    }
}

export default ApiResponse;