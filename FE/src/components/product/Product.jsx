import React from 'react'
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import CardItem from './CardItem';
import Slider from '../../components/slide/Slide';
import Wrapper from '../../components/Wrapper';
import Cookies from 'js-cookie';
import {getProducts, selectAllProducts} from './productsSlice';
import { useSelector, useDispatch } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  },[]);
  const allProducts = useSelector(selectAllProducts);
  if(Cookies.get('token') === undefined){
    window.location.href = '/';
  }else
  {
    if(allProducts.length === 0){return;};
    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <h3 style={{fontSize:25, width:'80%', margin:'auto'}}>Tất cả sản phẩm</h3>
        <hr style={{color: "red", height: 50,  width:'80%', margin:'auto'}}></hr>
        <Wrapper>
          {/* <Grid  xs={3} sm={3} md={4} item >
              <CardItem />
          </Grid> */}
          {allProducts.map((product) => {
            return <Grid key = {product._id}  xs={3} sm={3} md={4} item >
                    <CardItem id={product._id} des = {product.des} img={product.img} name={product.name}  />
                  </Grid>
          })}
        </Wrapper>
        <h3 style={{fontSize:25, width:'80%', margin:'auto'}}>Sản phẩm mới</h3>
        <hr style={{color: "red", height: 50,  width:'80%', margin:'auto'}}></hr>
        <Wrapper>
        {allProducts.map((product) => {
            return <Grid key = {product._id}  xs={3} sm={3} md={4} item >
                    <CardItem id={product._id} des = {product.des} img={product.img} name={product.name}  />
                  </Grid>
          })}
        </Wrapper>
      </>
    )
  }
} 

export default Product