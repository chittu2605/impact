import React from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
// import DropDownEditor from 'react-data-grid-addons/lib/editors/DropDownEditor';
import Select from "react-select";




const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title", editable: true,},
];

const rows = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];



class Example extends React.Component {
  state = {
      rows: [
        { id: 0, title: "Bug" },
        { id: 1, title: "Story" },
      ]
  }

  onRowsUpdate = ({ fromRow, toRow, updated }) => {
    //   debugger
      const rows = this.state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      this.setState({
        rows
      })
  };

  render() {
    return (
      <DataGrid
        columns={columns}
        rows={this.state.rows}
        onRowsUpdate={(e) => {
            console.log(e)
            this.onRowsUpdate(e)
        }}
      />
    );
  }
}

export default Example;
