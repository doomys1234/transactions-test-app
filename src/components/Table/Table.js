import { useDispatch } from "react-redux";
import { deleteData, modalToggle } from "../../redux/data/dataSlice";
import s from "./Table.module.scss";

export default function Table({ dataInfo }) {
  const dispatch = useDispatch()
  
  const onDeleteClick = (id) => {
    console.log('delete');
    dispatch(modalToggle())
    // dispatch(deleteData(id))
    
  }
    
  return (
    <>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.table_header}>Status</th>
            <th className={s.table_header}>Type</th>
            <th className={s.table_header}>Client Name</th>
                      <th className={s.table_header}>Amount</th>
                      <th className={s.table_header}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataInfo.map((item) => (
              
            <tr key={item.TransactionId || item.id}>
              <td>{item.Type}</td>
              <td>{item.Status || 'Successful'}</td>
              <td>{item.ClientName}</td>
                      <td>{item.Amount}$</td>
                      <td>
                          <button type="button">Edit</button>
                      <button onClick={()=>{onDeleteClick(item.TransactionId)}} type="button">Delete</button>
                      </td>
                      
              </tr>
              
              
          ))}
        </tbody>
      </table>
    </>
  );
}
