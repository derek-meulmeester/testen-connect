import queryString from "query-string";

export interface PageInfo {
  limit: number;
  page: number;
  cursor?: string;
  direction?: "next" | "previous";
}

export const pagingQueryParams = (pageInfo: PageInfo) => {
  const { limit, cursor, direction } = pageInfo;
  const params = { limit };

  if (cursor) {
    const cursorKey = direction === "next" ? "starting_after" : "ending_before";
    params[cursorKey] = cursor;
  }

  return queryString.stringify(params);
};
