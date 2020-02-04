const myPortfolio = [
  {
    _id: "0000000001",
    version: "1.0.0.1",
    name: "Nadir Antonio",
    lastName: "Soza Solis",
    country: "Nicaragua",
    city: "Juigalpa-Chontales",
    birthdate: "1986/01/14",
    gender: "M",
    profecion: "Ingeniero en Computación",
    occupation: "Ingeniero de Software en Airpak",
    email: {
      gmail: "nadirss14@gmail.com"
    },
    socialMedia: {
      twitter: "@nadirss14",
      facebook: "no thanks.."
    },
    site: "https://nadirss14.com",
    about:
      "Soy esposo, padre, hijo, ingeniero en computacion y estudiante eterno.",
    hobbies: ""
  },
  {
    _id: "0000000002",
    version: "1.0.0.2",
    name: "Nadir Antonio",
    lastName: "Soza Solis",
    country: "Nicaragua",
    city: "Juigalpa-Chontales",
    birthdate: "1986/01/14",
    gender: "M",
    profecion: "Ingeniero en Computación",
    occupation: "Ingeniero de Software en Airpak",
    email: [{ gmail: "nadirss14@gmail.com", yahoo: "nadirss14@yahoo.es" }],
    socialMedia: {
      twitter: "@nadirss14",
      facebook: "no thanks..",
      youtube: "soon",
      github: "https://github.com/nadirss14"
    },
    site: "https://nadirss14.com",
    about:
      "Soy esposo, padre, hijo, ingeniero en computacion y estudiante eterno.",
    hobbies: "Play futbol"
  }
];

module.exports = {
  hello: () => {
    return "Hello";
  },
  getPortfolios: () => {
    return myPortfolio;
  },
  getPortfolio: args => {
    const portfolio = myPortfolio.filter(port => port._id === args.id);
    return portfolio.pop();
  }
};
