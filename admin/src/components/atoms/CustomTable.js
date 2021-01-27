import React from "react";
import MaterialTable from "material-table";


const CustomTable = (props) => {
  const { columns, data, title } = props;
    return (
        <MaterialTable
          // columns={[
          //   { title: "Adı", field: "name" },
          //   { title: "Soyadı", field: "surname" },
          //   { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          //   {
          //     title: "Doğum Yeri",
          //     field: "birthCity",
          //     lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
          //   }
          // ]}
          // data={[
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
          // ]}
          // title="City"

          columns={columns}
          data={data}
          title={title}
        />

    )
}

export default CustomTable;