import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  try {
    const records = await table
      .select({ sort: [{ field: "created", direction: "desc" }] })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
