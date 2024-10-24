import dotenv from "dotenv";
import app from "./app";
import { PORT } from "./configs/env.configs";

dotenv.config();

const port = PORT || 6174;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
