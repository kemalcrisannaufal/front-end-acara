import { Fragment, ReactNode } from "react";
import PageHead from "../../common/PageHead";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface Proptypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="py-10 md:p-6">{children}</div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
