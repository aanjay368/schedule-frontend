import LoginPageLayout from "../layouts/LoginPageLayout";
import Background from "../components/Background";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {    
  return (
    <LoginPageLayout>
      <Background/>
      <LoginForm/>
    </LoginPageLayout>
  )
}
