class ApiError extends Error {
    statusCode: number;
    data: any; 
    success: boolean;
    errors: any[]; 
    constructor(
        statusCode: number,
        message: string = "Something went Wrong!",
        errors: any[] = [],
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null; // You can also change the type of data if needed
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };