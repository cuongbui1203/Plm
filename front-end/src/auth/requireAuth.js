/* eslint-disable no-unused-vars */
import { Container } from "react-bootstrap";
import { Outlet, Navigate } from "react-router-dom";
import { HeaderBar } from "../layout";
import Loading from "../page/loading";
import { useLoginContext, useSettingContext } from "../state/hook/hooks";
function RequiredAuth() {
  const [state, updateSettingState] = useSettingContext();
  const [loginState, updateLoginState] = useLoginContext();
  const { isLoading } = state;

  if (isLoading) {
    return <Loading show="yes" />;
  }
  return (
    <>
      {loginState.isLogin ? (
        <>
          <HeaderBar />
          <Container className="content">
            <Outlet />
          </Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default RequiredAuth;
