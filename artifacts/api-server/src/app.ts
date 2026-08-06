import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import blogRouter from "./routes/blog";
import { logger } from "./lib/logger";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "../public");

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(blogRouter);

app.use(express.static(PUBLIC_DIR));

// SPA fallback: any remaining GET request (not /api or /blog, already handled above)
// serves the built index.html so client-side routing (wouter) can take over.
app.get("/*splat", (_req, res, next) => {
  res.sendFile("index.html", { root: PUBLIC_DIR }, (err) => {
    if (err) next(err);
  });
});

export default app;
