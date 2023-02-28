import React from "react";
import {useNavigate} from 'react-router-dom'; 
interface ItemProp {
  id: number;
  title: string;
  content: string;
}

function TableItem({ id, title, content }: ItemProp) {
    const navigate = useNavigate(); 
    const onClickPost = () =>{
        navigate(`${id}`)
    } 
  return (
    <>
      <tbody onClick = {onClickPost}>
        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <td>{content}</td>
        </tr>
      </tbody>
    </>
  );
}

export default TableItem;
