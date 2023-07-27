import { Toaster } from "react-hot-toast";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/Header/Index";

function App() {
  return (
    <>
      <NavBar />
      <Toaster />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;
