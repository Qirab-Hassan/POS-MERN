import React from 'react'
import { Button , Card  } from 'antd';
import {ShoppingCartOutlined} from  '@ant-design/icons';
import { useDispatch } from "react-redux";

const ItemList = ({item}) => {
    const dispatch = useDispatch();
    
    //cart Handler
    const handleAddTOCart = () => {
        dispatch({
          type: "ADD_TO_CART",
          payload: {...item, quantity:1}
        });
      };

    const {Meta} = Card;
  return (
    <div>
        <Card
            hoverable
            style={{width:250,marginBottom:20 }}
            cover={< img alt = {item.name} src={item.image} style={{height:200 }}  />}
        >
            <Meta title = {item.name} />
            <div className="item-button">
                <Button onClick={() => handleAddTOCart()} icon={<ShoppingCartOutlined style={{color:'white'}} />}>ADD TO CART</Button>
            </div>
        </Card>    
    </div>
  );
};

export default ItemList;