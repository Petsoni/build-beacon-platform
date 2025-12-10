import { getAllDevelopers } from "@/services/developers-service";
import { protect } from "@/middleware";
import { Hono } from "hono";

const users = new Hono();

users.get("/", protect, getAllDevelopers);

export default users;
