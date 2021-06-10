import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Paste from "./components/Paste";
import Pagination from "./components/Pagination";
import SerachBar from "./SerachBar";

function App() {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currectPage, setCurrectPage] = useState(1);
  const [pastesPerPage] = useState(15);

  useEffect(() => {
    const getPastes = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3001");
      setPastes(response.data);
      setLoading(false);
    };
    getPastes();
  }, []);

  const indexOfLastPost = currectPage * pastesPerPage;
  const indexOfFirstPost = indexOfLastPost - pastesPerPage;
  const correctPost = pastes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurrectPage(pageNumber);
  };

  return (
    <div className="App">
      <SerachBar setPastes={setPastes} setLoading={setLoading} />
      <Paste pastes={correctPost} loading={loading} />
      <Pagination
        pastesPerPage={pastesPerPage}
        totalPastes={pastes.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
