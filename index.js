const getData = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjM1M2M1MTkxNzc3NWFlZDcyYWZmNjJlNWJkZGMwMyIsInN1YiI6IjY1OTM2YTYwNmFhOGUwNjFhYmVjMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgnLHM5qNXl0q__xNlRIeAZ-vBkkosYaVbM3OL7w-ak",
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const results = data.results.map((v) => ({
      title: v["title"],
      overview: v["overview"],
      poster: `https://image.tmdb.org/t/p/w500/${v["poster_path"]}`,
    }));
    return results;
  } catch (e) {
    console.log(e);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getData();
  console.log(data);
});
