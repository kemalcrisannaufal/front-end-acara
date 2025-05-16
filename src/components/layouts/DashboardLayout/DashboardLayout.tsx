import { ReactNode, useState } from "react";
import PageHead from "../../common/PageHead";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";

interface Proptypes {
  children: ReactNode;
  description?: string;
  title: string;
  type: "admin" | "member";
}

const DashboardLayout = (props: Proptypes) => {
  const { children, description, title, type } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />

      <div className="flex w-full max-w-screen-3xl 3xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={isOpen}
        />
        <div className="p-8 w-full h-screen overflow-y-auto">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            classNames={{ wrapper: "p-0" }}
            isBlurred={false}
            position="static"
          >
            <h1 className="font-bold text-3xl">{title}</h1>
            <NavbarMenuToggle
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
