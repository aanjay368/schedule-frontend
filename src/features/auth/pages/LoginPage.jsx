import { memo, useEffect } from "react";
import Background from "../components/common/Background";
import LoginForm from "../components/forms/LoginForm";
import Wrapper from "../../../components/ui/Wrapper";
import Container from "../../../components/ui/Container";

function LoginPage() {
  return (
    <Wrapper as="section" className="h-screen w-full">
      <Background />
      <div className="flex h-full items-center justify-center">
        <Container className="flex justify-center">
          <LoginForm />
        </Container>
      </div>
    </Wrapper>
  );
}

export default memo(LoginPage);
