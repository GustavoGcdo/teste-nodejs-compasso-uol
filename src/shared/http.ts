/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse = {
    body: any;
    statusCode: number;
}

export type HttpRequest = {
    params?: any;
    body?: any;
    queryParams?: any;
}
