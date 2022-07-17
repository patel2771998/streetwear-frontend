import React from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";
import ApiServices from '@config/ApiServices';
import ApiEndpoint from '@config/ApiEndpoint';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';  
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
export interface CustomerOrderListProps {}

const CustomerOrderList: React.FC<CustomerOrderListProps> = (props) => {

  const [customerData, setcustomerData] = useState([]);
  const [orderData, setorderData] = useState([]);

  const getCustomer = async () => {

    console.log(props);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const instance = axios.create({
      withCredentials: true,
    })
    instance.get(ApiEndpoint.RETRIVE_CUSTOMER_ORDER)
      .then(function (response) {
        // handle success
        if (!!response && !!response.data.orders) {
          setorderData(response.data.orders)
          //toast.error('Sucess')
        } else {
          toast.error(response.data)
        }

        console.log(response.data.customer, 'response');


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      



  }
  useEffect(() => {
    if (props) {
      getCustomer();

    }
  }, [props]);
  console.log(orderData, 'orderData');

  return (
    <div>
      <DashboardPageHeader title="My Orders" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Order #
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date purchased
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {orderData.map((item, ind) => (
        <OrderRow item={item} key={ind} />
      ))}

      {/* <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox> */}
    </div>
  );
};



const orderList = [
  {
    orderNo: "1050017AS",
    status: "Pending",
    purchaseDate: new Date(),
    price: 350,
    href: "/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Processing",
    purchaseDate: new Date(),
    price: 500,
    href: "/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
    href: "/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
    href: "/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Cancelled",
    purchaseDate: "2020/12/15",
    price: 300,
    href: "/orders/5452423",
  },
];

export default CustomerOrderList;
