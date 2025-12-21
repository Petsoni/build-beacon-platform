import {
  getAllDevelopersForExplorePage, updateDeveloperNameAndEmail,
  updateDeveloperXAccount,
  updateProjectDetailsAndStatus,
} from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const developerRoutes = new Hono();

developerRoutes.get("/", protect, getAllDevelopersForExplorePage);
developerRoutes.post("/update-x-username", protect, updateDeveloperXAccount);
developerRoutes.post("/update-name-and-email", protect, updateDeveloperNameAndEmail);
developerRoutes.post(
  "/update-project-details",
  protect,
  updateProjectDetailsAndStatus
);

export default developerRoutes;
