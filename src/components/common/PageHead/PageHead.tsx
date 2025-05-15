import Head from "next/head";

interface Proptypes {
  title?: string;
}

const PageHead = (props: Proptypes) => {
  const { title = "Acara" } = props;
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

export default PageHead;
