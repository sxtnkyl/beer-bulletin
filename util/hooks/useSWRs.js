import useSWR from "swr";

// export function useBulletins(baseApiUrl, fetcher, options) {
//   const { data, error } = useSWR(baseApiUrl, fetcher, options);
//   return {
//     bulletins: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export function useBulletins(baseApiUrl, fetcher, options) {
  const { data, error } = useSWR(["/trades", baseApiUrl], fetcher, options);
  return {
    bulletins: data,
    isLoading: !error && !data,
    isError: error,
  };
}
