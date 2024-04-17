import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./components/Home"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Navbar = lazy(() => import("./components/Navbar"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;

