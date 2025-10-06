import axios from "axios";

const API_URL = "http://localhost:5000/api/activity";

export const getBoardActivityLogs = async (boardId, token) => {
  const res = await axios.get(`${API_URL}/${boardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
