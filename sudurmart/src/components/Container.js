/** @format */

import { Outlet } from "react-router";

export default function Container(params) {
  return (
    <div className="w-full sm:w-11/12 lg:w-11/12 mt-20 mb-5 p-4 rounded mx-auto">
      <Outlet />
    </div>
  );
}
