import {
  getAllDevelopersForExplorePage,
  updateDeveloperXAccount,
} from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const developerRoutes = new Hono();

developerRoutes.get("/", protect, getAllDevelopersForExplorePage);
developerRoutes.post("/update-username", protect, updateDeveloperXAccount);

export default developerRoutes;
