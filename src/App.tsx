import styled from "styled-components";

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  background-color: dimgray;
  color: white;
  margin: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
  background-color: lightgray;
  padding: 1.25rem;
`;

const App = () => {
  return (
    <StyledApp>
      <H1>The Wide Oasis</H1>
      <Button onClick={() => alert("Check In")}>Check In</Button>
      <Input type="number" placeholder="Number of guests" />
    </StyledApp>
  );
};

export default App;
