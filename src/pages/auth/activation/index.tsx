import AuthLayout from "@/src/components/layouts/AuthLayout";
import Activation from "@/src/components/views/Auth/Activation";
import authServices from "@/src/services/auth.service";

interface Proptypes {
  status: "failed" | "success";
}

const ActivationPage = (props: Proptypes) => {
  return (
    <AuthLayout title="Acara | Activation">
      <Activation {...props} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activation({ code: context.query.code });

    if (!result.data.data) {
      return {
        props: {
          status: "failed",
        },
      };
    }

    return {
      props: {
        status: "success",
      },
    };
  } catch (error) {
    return {
      props: {
        status: "failed",
      },
    };
  }
}

export default ActivationPage;
