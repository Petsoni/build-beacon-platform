import {
  getAllDevelopers,
  updateDeveloperXAccount,
} from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const developerRoutes = new Hono();

developerRoutes.get("/", protect, getAllDevelopers);
developerRoutes.post("/update-username", protect, updateDeveloperXAccount);

export default developerRoutes;
