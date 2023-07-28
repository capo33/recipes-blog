import { Toaster } from "react-hot-toast";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Header } from "./components/Header/Index";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
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
