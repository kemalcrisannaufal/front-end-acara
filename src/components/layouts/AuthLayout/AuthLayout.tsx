import { ReactNode } from "react";
import PageHead from "../../common/PageHead";

interface Proptypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
