import { useState } from "react";
import {Calendar} from "react-production-calendar";

useState
export function HistoryTableRow({ history, setHistories }) {
  const {
    type,
    itemId,
    createdAt,
    date,
    stockInLocationId,
    stockOutLocationId,
    quantity,
  } = history;

  const [calendarValue,setCalendarValue]=useState(new Date().toLocaleString())

  return (
    <tr className="text-white border border-solid border-white p-1 hover:bg-amber-200 font-medium">
      <td className="border border-solid border-white p-1">{createdAt}</td>
      <Calendar onChange={setCalendarValue} value={calendarValue}/>
      <td className="border border-solid border-white p-1">{date}</td>
      <td className="border border-solid border-white p-1">{itemId}</td>

      <td className="border border-solid border-white p-1">{type}</td>
      <td className="border border-solid border-white p-1">
        {stockInLocationId}
      </td>
      <td className="border border-solid border-white p-1">
        {stockOutLocationId}
      </td>
      <td className="border border-solid border-white p-1">{quantity}</td>
     
    </tr>
  );
}
