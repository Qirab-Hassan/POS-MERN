import React,{useState,useEffect} from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Row, Col} from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';


const Homepage = () => {
  const [itemsData,setItemsData] = useState([])
  //Filters
  const [selectedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "Drink",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/2738/2738730.png",
    },
    {
      name: "Rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/4780/4780045.png",
    },
    {
      name: "Noodle",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/3041/3041130.png",
    },
    {
      name: "Burger",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/7522/7522572.png",
    },
    {
      name: "Coffee",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/2935/2935413.png",
    },
    {
      name: "Pizza",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/2497/2497913.png",
    },
  ];
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
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
        console.log(error);
      }
    }
    getAllItems();
  },[dispatch]) //Added dispatch in a Dependency Queue.
  return (
  <DefaultLayout>

    <div className='d-flex' >
      {categories.map((category) => (
        <div key={category.name} className={`d-flex category 
        ${
          selectedCategory === category.name && "category-active"
        }`}
        onClick={() => setSelecedCategory(category.name)}>
          <div style={{fontSize:'20px' , fontWeight:'bold' ,marginLeft:'10px', marginTop:'3px',color:'white'}}>{category.name}</div>
           <img
            src={category.imageUrl}
            alt={category.name}
            height='40'
            width='40'
           />
         </div>
      ))}    
    </div>
    <Row>
      {
        itemsData.filter((i) => i.category === selectedCategory).map(item => (
          <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item = {item} />
          </Col>
        ))
      }
    </Row>

  </DefaultLayout>
  ); 
};

export default Homepage;