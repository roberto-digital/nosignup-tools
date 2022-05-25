const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (record) => {
  if (!record.fields.approved) {
    record.fields.approved = false;
  }

  if (!record.fields.screenshot) {
    record.fields.screenshot = "http://placehold.jp/300x300.png";
  }

  if (!record.fields.rating) {
    record.fields.rating = 3;
  }

  if (!record.fields.category) {
    record.fields.category = "Utility";
  }

  if (!record.fields.featured) {
    record.fields.featured = false;
  }

  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecord, minifyRecords };
