const container = document.querySelector(".container");
const body = {
  career_application: {
    name: "Carlos Green",
    email: "verdeclos@gmail.com",
    role: "Junior Web Developer",
    notes: "Proficient in Javascript, HTML, CSS and the M.E.R.N. tech stack",
    submission_url: "https://juniorwebdevapplication.netlify.app",
    portfolio_url: "https://carlosgreenpersonalsite.com",
    resume_url: "https://carlosgreenpersonalsite.com/PDFS,Resume.pdf",
  },
};

fetch("http://localhost:3000/career_application", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => console.log("Got response:", data));

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((res) => res.json())
  .then((res) => {
    res.results.map((monster) => {
      fetch(monster.url)
        .then((res) => res.json())
        .then((pet) => {
          const card = document.createElement("div");
          const img = document.createElement("img");
          const p = document.createElement("p");

          img.src = pet.sprites.front_default;
          p.innerText = pet.name + "'s location: ";

          card.appendChild(img);
          card.appendChild(p);
          container.appendChild(card);
        });
    });
  });
