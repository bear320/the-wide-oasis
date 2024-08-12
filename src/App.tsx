import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.div`
  background-color: lightgray;
  padding: 1.25rem;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wide Oasis</Heading>
        <Heading as="h2">The Wide Oasis</Heading>
        <Heading as="h3">The Wide Oasis</Heading>
        <Button onClick={() => alert("Check In")}>Check In</Button>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
};

export default App;
