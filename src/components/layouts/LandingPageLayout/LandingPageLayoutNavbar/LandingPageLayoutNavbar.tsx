import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import {
  NAVBAR_ITEMS,
  NAVBAR_BUTTONS,
} from "./LandingPageLayoutNavbar.constants";
import Link from "next/link";
import { cn } from "@/src/utils/cn";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand>
          <Image
            src={"/images/general/logo.svg"}
            width={100}
            height={50}
            alt="logo"
          />
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex">
          {NAVBAR_ITEMS.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700", {
                "font-bold text-danger-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>

      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:flex">
          <Input
            placeholder="Search Event"
            startContent={<CiSearch />}
            onChange={() => {}}
          />
        </NavbarItem>
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointernpm"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"admin"}
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key={"profile"} href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key={"logout"} onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <Fragment>
            {NAVBAR_BUTTONS.map((item, index) => (
              <NavbarItem
                key={`${item.label}-${index}`}
                className="hidden lg:flex"
              >
                <Button
                  as={Link}
                  href={item.href}
                  color="danger"
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </Fragment>
        )}
      </NavbarContent>

      <NavbarMenu className="gap-4">
        {NAVBAR_ITEMS.map((item, index) => (
          <NavbarMenuItem
            as={Link}
            key={`${item.label}-${index}`}
            href={item.href}
            className={cn("text-lg font-medium text-default-700", {
              "font-bold text-danger-500": router.pathname === item.href,
            })}
          >
            {item.label}
          </NavbarMenuItem>
        ))}
        {session.status === "authenticated" ? (
          <Fragment>
            <NavbarMenuItem
              className={cn({
                hidden: dataProfile?.role !== "admin",
              })}
            >
              <Link
                href="/admin/event"
                className="font-medium text-default-700 hover:text-danger"
              >
                Admin
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="font-medium text-default-700 hover:text-danger"
                href="/member/profile"
              >
                Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                color="danger"
                onPress={() => signOut()}
                className="mt-2 w-full"
                variant="bordered"
                size="md"
              >
                Log Out
              </Button>
            </NavbarMenuItem>
          </Fragment>
        ) : (
          <Fragment>
            {NAVBAR_BUTTONS.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Button
                  as={Link}
                  href={item.href}
                  color="danger"
                  variant={item.variant as ButtonProps["variant"]}
                  fullWidth
                >
                  {item.label}
                </Button>
              </NavbarMenuItem>
            ))}
          </Fragment>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
