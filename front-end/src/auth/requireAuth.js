/* eslint-disable no-unused-vars */
import { Container } from "react-bootstrap";
import { Outlet, Navigate } from "react-router-dom";
import { HeaderBar, SideBar } from "../layout";
import Loading from "../page/loading";
import "../App.css";
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
          <SideBar />
          <Container className="content" style={{ marginLeft: "14vw" }}>
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
