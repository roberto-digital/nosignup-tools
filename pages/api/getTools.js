import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  let recordsArray = [];
  try {
    await table
      .select({ sort: [{ field: "created", direction: "desc" }] })
      .eachPage((records, fetchNextPage) => {
        recordsArray = [...recordsArray, ...records];
        fetchNextPage();
      });
    const minifiedRecords = minifyRecords(recordsArray);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
