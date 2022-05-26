import { table, minifyRecords } from "../api/utils/Airtable";
import { getToolData } from "../api/getToolData";

export default function Tool() {
  return <h1>Tool</h1>;
}

export async function getStaticPaths() {
  const paths = await table.select(params);
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const toolData = getToolData(params.id);
  return {
    props: {
      toolData,
    },
  };
}
