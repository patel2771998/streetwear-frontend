import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import productDatabase from "@data/product-database";
import useWindowSize from "@hook/useWindowSize";
import { format } from "date-fns";
import React, { Fragment } from "react";
import ApiServices from '@config/ApiServices';
import ApiEndpoint from '@config/ApiEndpoint';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';  
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = (props) => {

  const router = useRouter();
  const [orderData, setOrderData]= useState({
      id: "",
      created_at: '2022-05-07',
      items: [],
      shipping_address: {},
      subtotal: 0,
      total: 0,
      shipping_total: 0,
      discount_total: 0

  });


  useEffect(() => {
    console.log('viewAddress', router)
    if (!!router && !!router.query.id) {
      const id = router.query.id;
      console.log('viewOrder')
        viewOrder(id);
      
    }

  }, [router.isReady])


  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 350;


  const viewOrder = async () => {
    
    const id = router.query.id;
    const instance = axios.create({
      withCredentials: true,
    });
    instance.get(ApiEndpoint.RETRIVE_CUSTOMER_ORDER_BY + "/" + id)
      .then(function (response) {
        console.log('handle success');
        if (!!response && !!response.data.order) {
          //toast.success('Succesfully get data');
          setOrderData(response.data.order);
          // var addressList = response.data.customer.shipping_addresses;
          // console.log(addressList, 'addressList');
          // addressList.map((address) => {
          //     const id = router.query.id;
          //     console.log(id, address.id, "idmatched")
          //     if(address.id == id){
          //         console.log('matched');
          //         setgetAddress(address)
          //     }
          // })
        } else {
          toast.error(response.data)
        }
        //console.log(response.data.customer, 'response');
        

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const formateAddress = (address) => {
      var addresss = address.address_1?address.address_1:"";
      addresss += address.address_2?address.address_2:"";
      addresss += " ";
      addresss += address.city?address.city:"";
      addresss += " ";
      addresss += address.state?address.state:"";
      addresss += " ";
      addresss += address.country_code?address.country_code.toUpperCase():"";
      addresss += ", ";
      addresss += address.postal_code?address.postal_code:"";
      addresss += " ";
      return addresss;
      return address.address_1 + address.city+ address.state + address.country_code + address.postal_code;
  }
  const priceFormate = (price) => {
    var currency_symbols = {
      'USD': '$', // US Dollar
      'EUR': '€', // Euro
      'CRC': '₡', // Costa Rican Colón
      'GBP': '£', // British Pound Sterling
      'ILS': '₪', // Israeli New Sheqel
      'INR': '₹', // Indian Rupee
      'JPY': '¥', // Japanese Yen
      'KRW': '₩', // South Korean Won
      'NGN': '₦', // Nigerian Naira
      'PHP': '₱', // Philippine Peso
      'PLN': 'zł', // Polish Zloty
      'PYG': '₲', // Paraguayan Guarani
      'THB': '฿', // Thai Baht
      'UAH': '₴', // Ukrainian Hryvnia
      'VND': '₫', // Vietnamese Dong
    };
    
  }
  


  const orderListData = 
    <div>
      {/* <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Order Again
          </Button>
        }
      /> */}

      {/* <Card p="2rem 1.5rem" mb="30px">
        <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my="2rem"
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox>

        {/* <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
          >
            Estimated Delivery Date <b>4th October</b>
          </Typography>
        </FlexBox> 
      </Card> */}

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="14px">{orderData.id}</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Placed on:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(orderData.created_at), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivered on:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
          {orderData.items.map((item) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.thumbnail} size={64} />
                <Box ml="20px">
                  <H6 my="0px">{item.title}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    ${item.unit_price} x {item.quantity}
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  {item.description}
                </Typography>
              </FlexBox>
              {/* <FlexBox flex="160px" m="6px" alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox> */}
            </FlexBox>
          ))}
        </Box>
      </Card>



      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Shipping Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              {orderData.shipping_address? formateAddress(orderData.shipping_address):""}
            </Paragraph>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Subtotal:
              </Typography>
              <H6 my="0px">${orderData.subtotal}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Shipping fee:
              </Typography>
              <H6 my="0px">${orderData.shipping_total}</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Discount:
              </Typography>
              <H6 my="0px">-${orderData.discount_total}</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">${orderData.total}</H6>
            </FlexBox>
            {/* <Typography fontSize="14px">Paid by Credit/Debit Card</Typography> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  
    return (

      <div>
        <DashboardLayout content={orderListData} />
      </div>
    );
};

OrderDetails.layout = DashboardLayout;

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

//export default OrderDetails;
