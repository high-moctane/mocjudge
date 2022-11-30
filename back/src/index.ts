import fastify, { FastifyRequest, FastifyReply } from "fastify";
import SchemaBuilder from "@pothos/core";
import { createYoga } from "graphql-yoga";

const app = fastify();

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `hello, ${name || "Mocjudge"}`,
    }),
  }),
});

app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    console.log(reply);
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);
    console.log(reply);

    return reply;
  },
});

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  schema: builder.toSchema(),
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
});

app.listen({ port: 8438 }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${addr}`);
});
