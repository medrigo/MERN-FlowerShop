import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {postCheckoutInfo} from './checkOutSlice'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import PaidIcon from '@mui/icons-material/Paid';
import store from '../../redux/store';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#4c4c4c',
      contrastText: '#fff',
    },
    checkOut:{
      main: '#F06292',
      contrastText: '#fff',
    },
    deleteBtn:{
      main: '#1A2027',
      contrastText: '#fff',
    }
  },
});

const InfoCheckout = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [order_date, setOrder_date] = useState('');
  const [receiver, setReceiver] = useState('');
  const [payment, setPayment] = useState('');
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = (e) => {
    setPayment(e.target.value);
    setToggle(!toggle);
  }

  const handlePayment = async (event) => {
    const productCheckOut = store.getState().checkout.ListcheckOut[0].products;
    const token = Cookies.get('token');
    const urlCheckOut = await fetch('http://localhost:3002/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({token: token, products: productCheckOut})
    });
    const data = await urlCheckOut.json();
    window.location.href = data.url;
    console.log(data);
  };
  const handleSubmit = (e) => {
    const token = Cookies.get('token');
    const order = { fullname, email, phone, address, order_date, receiver, payment, token };
    if(fullname==''||email==''||phone==''||address==''||order_date==''||receiver==''||payment==''){
      swal({
        title: "Thông tin không được để trống",
        icon: "warning",
        button: "OK",
      })
    }else{
      if(email.indexOf('@')==-1){
        swal({
          title: "Email không hợp lệ",
          icon: "warning",
          button: "OK",
        })
    }else{
      if(phone.length<10){
        swal({
          title: "Số điện thoại không hợp lệ",
          icon: "warning",
          button: "OK",
        })
      }else{
        dispatch(postCheckoutInfo(order));
        swal({
          title: "Đặt hàng thành công",
          icon: "success",
          button: "OK",
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    }
  }
}
  return (
    <>
    <Box style={{marginLeft:'5%', position:'relative', display:toggle?'':'none'}} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid item xs={4}>
            <TextField onChange={(e)=>{setFullname(e.target.value)}} fullWidth size="small" label={'Họ và Tên'} id="margin-normal" />
        </Grid>
        <Grid item xs={4}>
            <TextField onChange={(e)=>{setEmail(e.target.value)}} fullWidth size="small" label={'Gmail'} id="margin-normal" />
        </Grid>
        <Grid item xs={4}>
            <TextField onChange={(e)=>{setPhone(e.target.value)}} fullWidth size="small" label={'Số Điện Thoại'} id="margin-normal" />
        </Grid>
      </Grid>
      <Grid style={{margin:'20px -10px'}} container spacing={1}>
        <Grid item xs={6}>
            <TextField onChange={(e)=>{setReceiver(e.target.value)}} fullWidth  size="small" label={'Họ và Tên Người Nhận'} id="margin-normal" />
        </Grid>
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField onChange={(e)=>{setOrder_date(e.target.value)}} size="small" id="date" label="Ngày Giao" type="date" fullWidth InputLabelProps={{shrink: true,}}/>
        </LocalizationProvider>
        </Grid>
      </Grid>
      <TextField onChange={(e)=>{setAddress(e.target.value)}} style={{marginTop:10}} fullWidth size="small" label={'Địa chỉ'} id="margin-normal" />
      {/* Phuong thuc thanh toan */}
      <FormControl>
      <FormLabel onClick={(e)=>{console.log(e.target.value)}} style={{fontSize:20, marginTop:10, marginBottom:20}} id="demo-form-control-label-placement">Phương thức thanh toán</FormLabel>
    </FormControl>
    </Box>
    <ThemeProvider theme={theme}>
    <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
        style={{marginLeft:'5%', marginTop:10}}
      >
        <FormControlLabel
          className='radio'
          value="COD"
          control={<Radio />}
          label={<img style={{width:75, height:75}} src="data:image/png;base64,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" alt="Option 1"></img>}
          labelPlacement="top"
          onChange={handleToggle}
        />
        <FormControlLabel
          className='radio'
          value="MOMO"
          control={<Radio />}
          label={<img style={{width:75, height:75}} src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg" alt="Option 1"></img>}
          labelPlacement="top"
          onChange={handleToggle}
        />
      </RadioGroup>
      <Button onClick={handleSubmit} color='checkOut'  style={{marginLeft:'80%', display:toggle?'':'none'}} variant="contained"><PaidIcon/>Thanh Toán</Button>
    </ThemeProvider>
    </>
  )
}

export default InfoCheckout