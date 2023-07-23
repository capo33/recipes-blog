import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Index";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
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
