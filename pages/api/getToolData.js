import { table } from "./utils/Airtable";

export async function getToolData(req, res) {
  const { id } = req.params;
  try {
    const record = await table.find(id);
    res.statusCode = 200;
    res.json(record);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
}
