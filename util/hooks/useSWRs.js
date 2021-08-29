import useSWR from "swr";

/* SearchBulletins */
export function useBulletins(baseApiUrl, fetcher, options) {
  const { data, error } = useSWR(baseApiUrl, fetcher, options);
  return {
    bulletins: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/* SearchBulletins[id] */
export function useBulletinDetails(baseApiUrl, id, token, fetcher, options) {
  const { data, error } = useSWR([baseApiUrl, id, token], fetcher, options);
  return {
    bulletinData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/* SearchBulletins[id], UserProfile */
export function useGetSingleUser(baseApiUrl, id, token, fetcher, options) {
  const { data, error } = useSWR([baseApiUrl, id, token], fetcher, options);
  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/* USERSBULLETINS- unique = "ub" */
export function useGetUserBulletins(
  baseApiUrl,
  id,
  token,
  unique,
  fetcher,
  options
) {
  const { data, error } = useSWR(
    [baseApiUrl, id, token, unique],
    fetcher,
    options
  );
  return {
    userBulletins: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/* USERSBULLETINS- unique = "uo" */
export function useGetUserOffers(
  baseApiUrl,
  id,
  token,
  unique,
  fetcher,
  options
) {
  const { data, error } = useSWR(
    [baseApiUrl, id, token, unique],
    fetcher,
    options
  );
  return {
    userOffers: data,
    isLoading: !error && !data,
    isError: error,
  };
}
