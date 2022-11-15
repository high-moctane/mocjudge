import fastify from "fastify";

const server = fastify();

server.get("/", async () => {
  return "Hello Mocjudge!";
});

server.listen({ port: 8438 }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${addr}`);
});
