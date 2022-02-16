export class BaseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(options: BaseErrorOptions) {
    super(options.msg);
    this.status = options.status;
    this.code = options.code;
    this.data = options.data;
  }

  private status: number;
  private code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private data?: any;
  public stack?: string;

  toJSON() {
    const response: {
      code?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [p: string]: any; // response may be any
    } = {
      msg: this.message,
    };

    if (this.data) Object.assign(response, this.data);
    if (this.code) response.code = this.code;

    return {
      status: this.status,
      response,
    };
  }
}

class UnauthenticatedError extends BaseError {
  constructor() {
    super({ msg: 'Unauthenticated', status: 401 });
  }
}
class NotFoundError extends BaseError {
  constructor() {
    super({ msg: 'Not Found', status: 404 });
  }
}

class UnprocessableEntityError extends BaseError {
  constructor(options: { code?: string; data?: object } = {}) {
    super({ ...options, msg: 'Unprocessable Entity', status: 422 });
  }
}

class InternalServerError extends BaseError {
  constructor(options: { stack?: string } = {}) {
    super({ ...options, msg: 'Internal Server Error', status: 500 });
  }
}

export const createError = {
  Unauthenticated: UnauthenticatedError,
  NotFound: NotFoundError,
  UnprocessableEntity: UnprocessableEntityError,
  InternalServerError: InternalServerError,
};

export interface BadDataError {
  // number is added to satisfy joi's typings, in
  // most cases string is used
  path: (string | number)[];
  message: string;
  type: string;
}

interface BaseErrorOptions {
  msg: string;
  status: number;
  code?: string;
  stack?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // additional error data
}
