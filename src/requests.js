// const API_KEY = "f85e3b31e546a3339733a14746d23b6a";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const MoviesRequests = [
  {
    id: 0,
    name: "Netflix Original",
    url: `api_key=${API_KEY}&with_networks=213`,
  },
  {
    id: 1,
    name: "Trending",
    url: `/day?api_key=${API_KEY}`,
  },
  {
    id: 2,
    name: "Top Rated",
    url: `api_key=${API_KEY}&language=en-US`,
  },
  {
    id: 4,
    name: "Comedy",
    url: `api_key=${API_KEY}&with_genres=35`,
  },
  {
    id: 6,
    name: "Romance",
    url: `api_key=${API_KEY}&with_genres=10749`,
  },
  {
    id: 7,
    name: "Documentary",
    url: `api_key=${API_KEY}&with_genres=99`,
  },
  {
    id: 8,
    name: "Animation",
    url: `api_key=${API_KEY}&with_genres=16`,
  },
  {
    id: 9,
    name: "Crime",
    url: `api_key=${API_KEY}&with_genres=80`,
  },
  {
    id: 10,
    name: "Drama",
    url: `api_key=${API_KEY}&with_genres=18`,
  },
  {
    id: 11,
    name: "Family",
    url: `api_key=${API_KEY}&with_genres=10751`,
  },
  {
    id: 12,
    name: "Mystery",
    url: `api_key=${API_KEY}&with_genres=9648`,
  },
  {
    id: 15,
    name: "History",
    url: `api_key=${API_KEY}&with_genres=36`,
  },
  {
    id: 16,
    name: "Western",
    url: `api_key=${API_KEY}&with_genres=37`,
  },
];

export const pages = [
  { id: 0, number: "1" },
  { id: 1, number: "2" },
  { id: 2, number: 3 },
  { id: 3, number: 4 },
  { id: 4, number: 5 },
  { id: 5, number: 6 },
  { id: 6, number: 7 },
  { id: 7, number: 8 },
  { id: 8, number: 9 },
  { id: 9, number: 10 },
  { id: 10, number: 11 },
  { id: 11, number: 12 },
  { id: 12, number: 13 },
  { id: 13, number: 14 },
  { id: 14, number: 15 },
  { id: 15, number: 16 },
  { id: 16, number: 17 },
  { id: 17, number: 18 },
  { id: 18, number: 19 },
  { id: 19, number: 20 },
  { id: 20, number: 21 },
  { id: 21, number: 22 },
  { id: 22, number: 23 },
  { id: 23, number: 24 },
  { id: 24, number: 25 },
  { id: 25, number: 26 },
  { id: 26, number: 27 },
  { id: 27, number: 28 },
  { id: 28, number: 29 },
  { id: 29, number: 30 },
];
