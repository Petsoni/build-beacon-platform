import { getAllDevelopers } from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const developerRoutes = new Hono();

developerRoutes.get("/", protect, getAllDevelopers);

export default developerRoutes;
