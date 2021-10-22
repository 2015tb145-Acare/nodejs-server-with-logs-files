require("dotenv").config({ path: "../.env" });

const { createLogger, transports, format } = require("winston");
const { simple, combine, timestamp, json } = format;

const customerLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/customer.log",
      level: "info",
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(timestamp(), json()),
    }),
  ],
});

//
// https://www.npmjs.com/package/winston
// If we're not in production then log to the `console` with the format:
//
if (process.env.NODE_ENV !== "production") {
  customerLogger.add(
    new transports.Console({
      format: simple(),
    })
  );
}

module.exports = { customerLogger };
