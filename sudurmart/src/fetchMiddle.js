export const fetchMiddle = async (url, params) =>
  new Promise((resolve, reject) => {
    fetch(url, params)
      .then((result) => {
        resolve(result.json());
      })
      .catch((error) => {
        console.log(error);
        resolve(null);
      });
  });
