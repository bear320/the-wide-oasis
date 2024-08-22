import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is an authenticated user, render the children
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
