export class DataResponse<T> {
    timestamp: number;
    execution_time_ms: number;
    data: T;
}