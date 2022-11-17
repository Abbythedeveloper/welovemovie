const lodash = require("lodash");
// final data convert into below shape if you add this function to the very bottom line.
// ```json
// {
//   "data": [
//     {
//       "review_id": 1,
//       "content": "Lorem markdownum ...",
//       "score": 3,
//       "created_at": "2021-02-23T20:48:13.315Z",
//       "updated_at": "2021-02-23T20:48:13.315Z",
//       "critic_id": 1,
//       "movie_id": 1,
//       "critic": {
//         "critic_id": 1,
//         "preferred_name": "Chana",
//         "surname": "Gibson",
//         "organization_name": "Film Frenzy",
//         "created_at": "2021-02-23T20:48:13.308Z",
//         "updated_at": "2021-02-23T20:48:13.308Z"
//       }
//     }
//     // ...
//   ]
// }
function addCritic(data) {
  if (data) {
    let formattedData;

    if (Array.isArray(data)) {
      formattedData = data.map((review) => {
        return Object.entries(review).reduce((accumulator, [key, value]) => {
          return lodash.set(accumulator, key, value);
        }, {});
      });
    } else {
      formattedData = Object.entries(data).reduce(
        (accumulator, [key, value]) => {
          return lodash.set(accumulator, key, value);
        },
        {}
      );
    }

    return formattedData;
  }

  return data;
}
module.exports = addCritic;
