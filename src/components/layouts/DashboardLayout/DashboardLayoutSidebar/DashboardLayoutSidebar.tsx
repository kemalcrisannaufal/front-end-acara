import { cn } from "@/src/utils/cn";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";

interface ISidebarItem {
  href: string;
  key: string;
  label: string;
  icon: JSX.Element;
}

interface Proptypes {
  isOpen: boolean;
  sidebarItems: ISidebarItem[];
}

const DashboardLayoutSidebar = (props: Proptypes) => {
  const { isOpen, sidebarItems } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col items-center justify-between border-r-1 border-default-200 bg-white px-4 py-6 lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div className="w-full">
        <div className="flex justify-center">
          <Image
            src={"/images/general/logo.svg"}
            alt="logo"
            width={150}
            height={150}
            onClick={() => router.push("/")}
          />
        </div>

        <Listbox
          className="p-5 w-full"
          variant="solid"
          aria-label="Dashboard Menu"
          items={sidebarItems}
        >
          {sidebarItems.map((item) => {
            return (
              <ListboxItem
                key={item.key}
                startContent={item.icon}
                variant="solid"
                className={cn("my-1 h-12 text-xl", {
                  "bg-danger-500 text-white": router.pathname === item.href,
                })}
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
              >
                <p className="text-small">{item.label}</p>
              </ListboxItem>
            );
          })}
        </Listbox>
      </div>

      <div className="flex items-center p-1 w-full">
        <Button
          color="danger"
          fullWidth
          size="lg"
          variant="light"
          className="flex justify-start gap-1"
          onClick={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
