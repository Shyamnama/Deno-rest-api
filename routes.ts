import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "./controllers/notes.ts";

const router = new Router();

router.get("/notes", getNotes)
  .post("/notes", createNote)
  .get("/notes/:id", getNote)
  .put("/notes/:id", updateNote)
  .delete("/notes/:id", deleteNote);

export default router;
