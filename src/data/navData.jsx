let i = new Date().getTime();
export const navItems = [
  { title: "Accueil", path: "/", cName: "nav-item", id: i++, active: false },
  {
    title: "Films",
    path: "/movies",
    cName: "nav-item",
    id: i++,
    active: false,
  },
  { title: "Admin", path: "/admin", cName: "nav-item", id: i++, active: false },
];
export const navBtns = [
  { title: "Connexion", path: "/login", cName: "nav-cta", id: i++ },
];
