import { RevoGrid } from "@revolist/react-datagrid";
import { CellValidatePlugin, ColumnDropdown } from "@revolist/revogrid-pro";
import { useMemo } from "react";

import "@revolist/revogrid-pro/dist/revogrid-pro.css";
const statuses = ["Open", "In Review", "Complete", "Blocked", "Pending"];
const categories = [
  "",
  "Design",
  "Frontend",
  "Backend",
  "QA",
  "DevOps",
  "Marketing",
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const checkEmpty = (value) => !value.model.category;

const generateRow = (i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  status: getRandom(statuses),
  category: getRandom(categories),
});

function Grid() {
  const source = useMemo(() => {
    const rows = [];
    for (let i = 0; i < 50; i++) rows.push(generateRow(i));
    return rows;
  }, []);

  const columnTypes = useMemo(() => ({ dropdown: ColumnDropdown }), []);

  const columns = useMemo(
    () => [
      { prop: "id", name: "ID", size: 70 },
      { prop: "title", name: "Title", size: 200 },
      {
        prop: "status",
        name: "Status",
        size: 120,
        columnType: "dropdown",
        dropdown: {
          syncCellTemplate: true,
          source: statuses.map((s, i) => ({ value: `${i}${s}`, label: s })),
          placeholder: "Select status",
          config: { search: true },
        },
        readonly: (value) => !checkEmpty(value),
      },
      {
        prop: `category`,
        name: `Category`,
        size: 140,
        columnType: "dropdown",
        dropdown: {
          source: categories.map((c) => ({ value: c, label: c })),
        },
      },
    ],
    [statuses, categories],
  );

  const plugins = useMemo(() => [
    //HistoryPlugin,
    CellValidatePlugin,
  ]);

  return (
    <>
      <RevoGrid
        columns={columns}
        columnTypes={columnTypes}
        source={source}
        plugins={plugins}
        style={{ minHeight: "600px" }}
      />
    </>
  );
}

export default Grid;
