import {
  getAllDevelopersForExplorePage,
  updateDeveloperXAccount,
  updateProjectDetailsAndStatus,
} from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const developerRoutes = new Hono();

developerRoutes.get("/", protect, getAllDevelopersForExplorePage);
developerRoutes.post("/update-username", protect, updateDeveloperXAccount);
developerRoutes.post(
  "/update-project-details",
  protect,
  updateProjectDetailsAndStatus
);

export default developerRoutes;
