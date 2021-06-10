import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Paste from "./components/Paste";
import Pagination from "./components/Pagination";

function App() {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currectPage, setCurrectPage] = useState(1);
  const [pastesPerPage] = useState(10);

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

  const paginate = pageNumber => setCurrectPage(pageNumber);

  return (
    <div className="App">
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
