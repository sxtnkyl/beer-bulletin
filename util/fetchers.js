// export const fetchBulletins = async (baseApiUrl) => {
//   let api = await fetch(`${baseApiUrl}/trades`);
//   let bulletins = api.json();
//   return bulletins;
// };
export const fetchBulletins = async (url, baseApiUrl) => {
  let api = await fetch(`${baseApiUrl}${url}`);
  let bulletins = api.json();
  return bulletins;
};
