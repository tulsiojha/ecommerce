/** @format */

import Container from "./Container";
import Menu from "./Menu";
import Nav from "./Nav";
import sidebarConfig from "./SidebarConfig";

export default function Page(params) {
  return (
    <>
      {/* <Nav navConfig={sidebarConfig} /> */}
      
      <Menu navConfig={sidebarConfig} />
      {/* <Container /> */}
    </>
  );
}
