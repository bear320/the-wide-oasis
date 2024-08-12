// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Row from "./ui/Row";
// import Heading from "./ui/Heading";
// import Button from "./ui/Button";
// import Input from "./ui/Input";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

// const StyledApp = styled.div`
//   padding: 1.25rem;
// `;

// const App = () => {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">The Wide Oasis</Heading>

//             <div>
//               <Heading as="h2">Check in and out</Heading>
//               <Button onClick={() => alert("Check In")}>Check In</Button>
//               <Button
//                 variation="secondary"
//                 size="small"
//                 onClick={() => alert("Check out")}
//               >
//                 Check Out
//               </Button>
//             </div>
//           </Row>

//           <Row>
//             <Heading as="h3">Form</Heading>

//             <form>
//               <Input type="number" placeholder="Number of guests" />
//               <Input type="number" placeholder="Number of guests" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// };

// export default App;

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/cabins",
    element: <Cabins />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
