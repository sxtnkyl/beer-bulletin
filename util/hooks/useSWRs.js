import useSWR from "swr";
import { fetchCloudinary } from "../fetchers";

/* SearchBulletins */
export function useBulletinsWithOffers(baseApiUrl, fetcher, options) {
  console.log("runnin HOOK");
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

// export function useCloudinary(baseApiUrl, reader) {
//   const { data, mutate, error } = useSWR(
//     `${baseApiUrl}/images/img_upload/`,
//     fetchCloudinary(baseApiUrl, reader)
//   );
//   return {
//     img: data,
//     mutate,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }
