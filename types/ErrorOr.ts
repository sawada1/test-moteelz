export class ErrorOr<T> {
  data: T | null;
  error: string | null;
  statusCode: number | null;
  loading: boolean;
  response: Response | null;
  search_id: string | null;
  constructor(
    data: T | null = null,
    error: string | null = null,
    statusCode: number | null = null,
    response: Response | null = null,
    search_id: string | null = null,
  ) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
    this.loading = false;
    this.response = response;
    this.search_id = search_id;
  }

  static loading<T>(): ErrorOr<T> {
    const result = new ErrorOr<T>();
    result.loading = true;
    return result;
  }

  static success<T>(
    data: T,
    statusCode: number,
    response: Response | null
  ): ErrorOr<T> {
    return new ErrorOr<T>(data, null, statusCode, response);
  }

  static failure<T>(
    error: string,
    statusCode: number,
    response: Response | null,
    search_id:string | null
  ): ErrorOr<T> {
    return new ErrorOr<T>(null, error, statusCode, response, search_id);
  }
}
