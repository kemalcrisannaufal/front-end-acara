import { ReactNode } from "react";
import PageHead from "../../common/PageHead";

interface Proptypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: Proptypes) => {
  const { children, title } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 py-10">
      <PageHead title={title} />
      <section className="max-w-screen-2xl p-6 2xl:container">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
