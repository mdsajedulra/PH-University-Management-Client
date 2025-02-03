const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: "Admin-Dashboard",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "create-admin",
      },
      {
        name: "create Faculty",
        path: "/admin/craete-faculty",
        element: "CREATE-FACULTY",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "CREATE-STUDENT",
      },
    ],
  },
];

const newArray = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

console.log(newArray);
