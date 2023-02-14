import { HashRouter } from "react-router-dom";
import FirebaseProvider from "./contexts/firebase";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import RoutesApp from "./routes/routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <HashRouter>
      <FirebaseProvider>
        <ToastContainer autoClose={3000} />
        <Navbar />
        <RoutesApp />
      </FirebaseProvider>
    </HashRouter>
  );
}

export default App;
