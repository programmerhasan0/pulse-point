class ApiResponse {
    constructor(res) {
        this.res = res;
    }

    success(
        code = 200,
        status = 'success',
        message = 'operation successful',
        data = []
    ) {
        this.res.status(code);
        this.res.json({ code, status, message, data });
        return this;
    }

    error(
        code = 500,
        status = 'error',
        message = 'Internal server error',
        data = []
    ) {
        this.res.status(code);
        this.res.json({ code, status, message, data });
        return this;
    }
}

export default ApiResponse;
