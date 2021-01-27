import React from "react";
import moment from "moment";


const TransactionListItem = (props) => {
  let { task_date, msg, credit, debit } = props.data;
  return (
    <tr>
      <td>{moment(task_date).format("llll")}</td>
      <td>{msg}</td>
      <td 
        align="center"
        className={credit == 0 ? "debit": "credit"}
      >{credit == 0 ? `-${debit}` : `+${credit}`}</td>
    </tr>
  )
}

export default TransactionListItem