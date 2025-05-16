import AuthLayout from "@/src/components/layouts/AuthLayout";
import Login from "@/src/components/views/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout title="Acara | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
