const express = require('express');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const {
  SENTRY_DSN,
} = require('./config');

const {
  TestItem,
} = require('./models');

const app = express();

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app,
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    }),
    new Tracing.Integrations.Postgres(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get('/', (req, res, next) => {
  TestItem.findAll({
    raw: true,
  }).then((items) => {
    res.send(items);
  }).catch(next);
});

app.get('/check-error', (req, res) => {
  throw new Error('Test express problem');
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000);
