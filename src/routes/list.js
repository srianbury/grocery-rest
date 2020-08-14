import { Router } from "express";
import fetch from "node-fetch";
import { authorize } from "../common";

const router = Router();

router.get("/", authorize, async (req, res) => {
  const listDocument = await req.context.models.List.findById(
    req.userInfo.user._id
  );
  const { list } = listDocument;
  return res.status(200).json({
    list
  });
});

router.post("/", authorize, async (req, res) => {
  const { upcCode } = req.body;
  const item = await getName(upcCode);

  if (!item["success"]) {
    const { message } = item.error;
    return res.status(401).json({ message });
  }

  const newItem = req.context.models.ListItem({
    name: item.title
  });
  const listDocument = await req.context.models.List.findById(
    req.userInfo.user._id
  );
  const currentList = listDocument.list;
  listDocument.list = [...currentList, newItem];
  await listDocument.save();

  return res.status(200).json({ item: newItem });
});

router.delete("/:id", authorize, async (req, res) => {
  const listDocument = await req.context.models.List.findById(
    req.userInfo.user._id
  );
  const updatedList = listDocument.list.filter(
    item => item._id != req.params.id
  );
  listDocument.list = updatedList;
  await listDocument.save();
  return res.status(200).json({ message: "Successfully delted." });
});

router.delete("/", authorize, async (req, res) => {
  const listDocument = await req.context.models.List.findById(
    req.userInfo.user._id
  );
  listDocument.list = [];
  await listDocument.save();
  return res.status(200).json({ message: "Successfully deleted all items." });
});

async function getName(upcCode) {
  const url = `https://api.upcdatabase.org/product/${upcCode}?apikey=${process.env.UPC_API_KEY}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export default router;
