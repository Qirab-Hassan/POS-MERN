import React ,{useEffect , useState} from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table ,message} from 'antd';

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData,setItemsData] = useState([])
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {

      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get("/api/items/get-item");
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch(error){
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  }
  //useEffect
  useEffect(() => {
    getAllItems();
  },[]);

  //Handle Delete
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Item Deleted Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //Table Data
  const columns = [
    {title:'Name', dataIndex:'name'},
    {title:'Image',dataIndex:'image', 
    render:(image,record) => <img src={image} alt={record.name} height="60" width="60"/>},
    {title:'Price',dataIndex:'price'},
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id,record) => (
        <div>
          <EditOutlined 
          style={{cursor:"pointer"}}
          onClick={() => {
            setEditItem(record);
            setPopupModal(true);
          }}
          />
          <DeleteOutlined 
          style={{cursor:"pointer"}}
          onClick={() =>{
            handleDelete(record);
          }}
          />
        </div>
      ),
    },
];
// handle form submit
const handleSubmit = async (value) => {
  if(editItem === null){
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post("/api/items//add-item" ,value);
      message.success('Item Added Successfully')
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
  
    } catch(error){
      dispatch({ type: "HIDE_LOADING" });
      message.error('Something Went Wrong')
      console.log(error);
    }
  }
  else{
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
       await axios.put("/api/items//edit-item" ,{...value,itemId:editItem._id });
      message.success('Item Updated Successfully')
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
  
    } catch(error){
      dispatch({ type: "HIDE_LOADING" });
      message.error('Something Went Wrong')
      console.log(error);
    }
  }

};


  return (
    <DefaultLayout>
      <div className="d-flex justify-content-end" >
      <Button type="primary" style={{marginBottom:20 }} onClick={() => setPopupModal(true)} >Add Item</Button>
      </div>
      
    <Table columns={columns} dataSource={itemsData} bordered style={{fontWeight:'bold'}}/>

      {
        popupModal && (
      <Modal  title={`${editItem !== null ? "Edit Item " : "Add New Item"}`}
       visible={popupModal}
       onCancel={() => {
        setPopupModal(false)
        setEditItem(null)
       }} 
       footer={false} 
       style={{fontWeight:'bold'}}>

       <Form layout='vertical' onFinish={handleSubmit} initialValues={editItem}>

        <Form.Item name="name" label="Name">
          <Input/>
        </Form.Item>
        <Form.Item name="price" label="Price">
          <Input/>
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Input/>
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select>
            <Select.Option value="Drink" >Drink</Select.Option>
            <Select.Option value="Rice">Rice</Select.Option>
            <Select.Option value="Noodle">Noodle</Select.Option>
            <Select.Option value="Burger">Burger</Select.Option>
            <Select.Option value="Coffee">Coffee</Select.Option>
            <Select.Option value="Pizza">Pizza</Select.Option>
          </Select>
        </Form.Item>
        <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
         </div>
       </Form>
      </Modal>
        )
      }

      
    </DefaultLayout>   
  );
};

export default ItemPage;