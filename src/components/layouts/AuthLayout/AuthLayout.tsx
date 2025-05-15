import { ReactNode } from "react";
import PageHead from "../../common/PageHead";

interface Proptypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: Proptypes) => {
  const { children, title } = props;
  return (
    <>
      <PageHead title={title} />
      <section className="p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
