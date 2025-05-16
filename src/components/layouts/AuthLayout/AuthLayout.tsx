import { ReactNode } from "react";
import PageHead from "../../common/PageHead";

interface Proptypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: Proptypes) => {
  const { children, title } = props;
  return (
    <div className="flex flex-col justify-center items-center gap-10 py-10 min-h-screen">
      <PageHead title={title} />
      <section className="p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
