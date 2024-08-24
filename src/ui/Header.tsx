import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  gap: 2.4rem;
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
