import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Row from "./ui/Row";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.div`
  padding: 1.25rem;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wide Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("Check In")}>Check In</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check out")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>

            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
};

export default App;
