export const fetchBulletins = async (baseApiUrl) => {
  let api = await fetch(`${baseApiUrl}/trades`);
  let bulletins = api.json();
  return bulletins;
};

export const fetchSingleBulletin = async (baseApiUrl, id, token) => {
  let api = await fetch(`${baseApiUrl}/trades/${id}`, {
    headers: {
      authorization: token || "",
    },
  });
  let bulletin = api.json();
  return bulletin;
};

export const fetchSingleUser = async (baseApiUrl, id, token) => {
  let api = await fetch(`${baseApiUrl}/users/${id}`, {
    headers: {
      authorization: token || "",
    },
  });
  let user = api.json();
  return user;
};

export const fetchUserWithBulletins = async (baseApiUrl, id, token) => {
  let api = await fetch(`${baseApiUrl}/users/with-trades/${id}`, {
    headers: {
      authorization: token || "",
    },
  });
  let bulletins = api.json();
  return bulletins;
};

export const fetchUserWithOffers = async (baseApiUrl, id, token) => {
  let api = await fetch(`${baseApiUrl}/users/with-offers/${id}`, {
    headers: {
      authorization: token || "",
    },
  });
  let offers = api.json();
  return offers;
};
