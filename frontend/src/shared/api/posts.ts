import axios from "axios";

const API_URL = "/api/posts";

export const postApi = {
  async getAll() {
    const res = await axios.get(API_URL);
    return res.data;
  },
  async create(content: string, token: string) {
    const res = await axios.post(
      API_URL,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
};
