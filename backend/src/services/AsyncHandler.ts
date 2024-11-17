// async handler service makes error handling consistent across the application | codebase

const AsyncHandler = (fn: Function) => {
    return async (req: any, res: any, next: any) => {

        try {
            
            await fn(req, res, next);
        } catch (error) {
            
            res.status(error.code || 500).json({
                success :false,
                message:error.message
            
            });
        }
    }

};

export default AsyncHandler;