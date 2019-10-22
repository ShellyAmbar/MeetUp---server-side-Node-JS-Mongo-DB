import { Router } from "express";
import * as GroupController from "./controller";

const routes = new Router();
routes.post("/Groups/new", GroupController.createGroup);
routes.post("/Groups/:groupId/meetups/new", GroupController.createGroupMeetup);
routes.get("/Groups", GroupController.getAllGroups);
routes.get("/Groups/:groupId/meetups", GroupController.getGroupMeetups);
export default routes;
