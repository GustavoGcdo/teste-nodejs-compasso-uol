export interface PaginateResult<T> {
  total: number;
  results: T[];
}

export interface PaginateOptions {
  skip?: number;
  limit?: number;
}

export const getPaginateOptions = (textPage?: string, textlimit?: string): PaginateOptions => {
  let page = 1;
  let skip = 0;
  let limit = 0;

  if (textPage) {
    const parsedPage = parseInt(textPage);
    page = isNaN(parsedPage) ? page : parsedPage;
  }

  if (textlimit) {
    const parsedLimit = parseInt(textlimit);
    limit = isNaN(parsedLimit) ? limit : parsedLimit;
  }

  skip = (page - 1) * limit;

  return {
    skip,
    limit
  };
}
