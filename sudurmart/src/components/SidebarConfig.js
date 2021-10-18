/** @format */
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: "home",
    path: "/dashboard/app",
  },
  {
    title: "general",
    path: "/dashboard/general",
  },
  {
    title: "notesby",
    path: "/dashboard/notesby",
  },
  {
    title: "newpost",
    path: "/dashboard/newpost",
  },
  {
    title: "posts",
    path: "/dashboard/posts",
  },
  {
    title: "facility",
    path: "/dashboard/facilities",
    children: [
      { title: "hostel", path: "/dashboard/facilities/hostel" },
      { title: "transport", path: "/dashboard/facilities/transport" },
      { title: "library", path: "/dashboard/facilities/library" },
    ],
  },
  {
    title: "labs",
    path: "/dashboard/labs",
  },
  {
    title: "programmes",
    path: "/dashboard/programmes",
  },
];

export default sidebarConfig;
