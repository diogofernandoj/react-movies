import { BrowserRouter } from "react-router-dom";
import FirebaseProvider from "./contexts/firebase";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import RoutesApp from "./routes/routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <ToastContainer autoClose={3000} />
        <Navbar />
        <RoutesApp />
      </FirebaseProvider>
    </BrowserRouter>
  );
}

export default App;
