// Import the  Express app instance that created in app.ts
import app from "./app";

// Use environment variables in your configuration
const PORT: string | number = process.env.PORT || 3000;

// Start the server and make it listen on the defined port
// The callback function runs once the server is successfully up and running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log a message for confirmation
});