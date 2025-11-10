import app from "./app";

//Define the port number where the server will listen for incoming requests
const PORT =3000;

// Start the server and make it listen on the defined port
// The callback function runs once the server is successfully up and running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
