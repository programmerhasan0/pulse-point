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

    unauthorized(
        message = 'Sorry! you are not authorized to perform this operation',
        data = []
    ) {
        this.res.status(401);
        this.res.json({ code: 401, status: 'unauthorized', message, data });
        return this;
    }

    badRequest(
        message = 'One or more fields are missing',
        status = 'missing fields',
        data = []
    ) {
        this.res.status(400);
        this.res.json({ code: 400, status, message, data });
        return this;
    }
}

export default ApiResponse;
