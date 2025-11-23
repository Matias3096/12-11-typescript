export interface ApiError {
    message: string;
    status?: number;
    timestamp: string;
}

export type ApiResponse<T> =
    |{ success: true; data: T}
    |{ success: false; error: ApiError};