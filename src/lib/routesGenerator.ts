import { ReactNode } from "react";
import { TRoutes } from "../types";

type TRoute = {
  path: string;
  element: ReactNode;
};

// type TSidebarItem = {
//   key: string;
//   label: ReactNode;
//   children?: TSidebarItem[];
// };


export const routesGenerator = (items: TRoutes[]) => {
  const Routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
  return Routes;
};
