export const fetchBulletinsWithOffers = async (baseApiUrl) => {
  console.log("im running");
  let api = await fetch(`${baseApiUrl}/trades/with-offers`);
  let bulletins = api.json();
  return bulletins;
};

export const fetchSingleBulletin = async (baseApiUrl, id, token) => {
  let api = await fetch(`${baseApiUrl}/trades/with-offers/${id}`, {
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

export const fetchCloudinary = (baseApiUrl, reader) => {
  let api = fetch(`${baseApiUrl}/images/img_upload/`, {
    method: "POST",
    body: JSON.stringify({ data: reader.result }),
    headers: { "Content-Type": "application/json" },
  });
  let img = api.json();
  return img;
};
