import { protect } from "@/middleware";
import { getProjectsForDeveloper } from "@/services/projects-service";
import { Hono } from "hono";

const projectsRoutes = new Hono();
