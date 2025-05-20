import { cn } from "@/src/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode, useContext, useEffect } from "react";
import Toaster from "../../ui/Toaster";
import { defaultToaster, ToasterContext } from "@/src/contexts/ToasterContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Proptypes {
  children: ReactNode;
}

const AppShell = (props: Proptypes) => {
  const { children } = props;
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toaster]);

  return (
    <main className={cn(inter.className)}>
      {children}
      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </main>
  );
};

export default AppShell;
