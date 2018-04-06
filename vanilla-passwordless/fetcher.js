const fetcher = (url, options) => {
  let accessToken = localStorage.getItem("access_token");
  let fetchOpt = {};
  if (options && options.method === "POST") {
    fetchOpt = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(UIUpdate.getUsernamePassword())
    }
  } else {

    // Check for an access token and add the header to the request
    fetchOpt.headers = (accessToken) ? {"Authorization": "Bearer " + accessToken} : {};
  }

  return fetch(url, fetchOpt)
      .then(resp => {
        UIUpdate.updateCat(resp.status);
        return resp.text();
      }).then(body => {
        UIUpdate.alertBox(body);
        return body;
      });
};
