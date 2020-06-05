import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../mongodb.ts";

const notesCollection = db.collection("notes");

export const getNotes = async (ctx: RouterContext) => {
  const notes = await notesCollection.find();
  ctx.response.body = notes;
};

export const getNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const note = await notesCollection.findOne({ _id: { $oid: id } });
  ctx.response.body = note;
};

export const createNote = async (ctx: RouterContext) => {
  const { value: {title, body} } = await ctx.request.body();

  const notes: any = {
    title,
    body,
  };

  const id = await notesCollection.insertOne(notes);
  notes._id = id;
  ctx.response.status = 201;
  ctx.response.body = notes;
};

export const updateNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { value: {title, body} } = await ctx.request.body();

  const { modifiedCount } = await notesCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        title,
        body,
      },
    },
  );
  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = {
      error: "Note does not exist",
    };
    return;
  }

  ctx.response.body = await notesCollection.findOne({ _id: { $oid: id } });
};

export const deleteNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const count = await notesCollection.deleteOne({ _id: { $oid: id } });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Note not found" };
    return;
  }
  ctx.response.status = 204;
};
