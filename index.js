const express = require('express');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.get('/', (req, res) => {
  res.end('Hello world!');
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000);
