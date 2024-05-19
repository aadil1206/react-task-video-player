import logo from "./logo.svg";
import "./App.css";

import Notes from "./components/notes";
import Video from "./components/Video";

function App() {
  return (
    <div className="App">
      <Video />
      <Notes />
    </div>
  );
}

export default App;
