import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Table from "react-bootstrap/Table";

function HistoryList() {
  const [history, setHistory] = useState([]);
  const { token, fetchWithToken } = useToken();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    async function getData() {
      if (token) {
        const resp = await fetchWithToken(
          `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/`
        );
        if (resp) {
          const data = await resp;
          if (isMounted) {
            setHistory(data.history);
            setIsMounted(false);
          }
        }
      }
    }
    getData();
  }, [token, fetchWithToken, isMounted]);

  const handleDelete = async (e) => {
    const historyId = e.target.id;
    if (token) {
      const resp = await fetchWithToken(
        `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/${historyId}/`,
        "DELETE"
      );
      if (resp) {
        const data = await resp;
        return data
      }
    }
  };

  return (
    <>
      {history && (
        <Table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather</th>
              <th>Playlist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => {
              return (
                <tr key={h.id}>
                  <td>{h.date}</td>
                  <td>{h.weather}</td>
                  <td><Link to={h.playlist} target="_blank">{h.playlist}</Link></td>
                  <td>
                    <button
                      onClick={handleDelete}
                      value={h.user_id}
                      id={h.id}
                      className="dropdown-item text-danger"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
export default HistoryList;
