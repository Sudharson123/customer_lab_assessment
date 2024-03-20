import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import Schema from "./schema";
function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Schema />
      </ToastProvider>
    </div>
  );
}

export default App;
