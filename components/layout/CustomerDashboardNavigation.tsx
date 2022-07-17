import Box from "@component/Box";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import axios from "axios";
import { useState, useEffect } from "react";
import ApiServices from '@config/ApiServices';
import ApiEndpoint from '@config/ApiEndpoint';
import { toast } from 'react-toastify';


const CustomerDashboardNavigation = (props) => {
  const { pathname } = useRouter();
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
    console.log(instance, 'instance', ApiEndpoint.RETRIVE_CUSTOMER_ORDER)
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

        console.log(error, 'error');
      })
      .then(function () {
        // always executed
      });
      instance.get(ApiEndpoint.RETRIVE_CUSTOMER)
        .then(function (response) {
          // handle success
          if (!!response && !!response.data.customer) {
            setcustomerData(response.data.customer)
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

  console.log(orderData, 'setorderData');
  console.log(customerData, 'customerData');
  const linkList = [
    {
      title: "DASHBOARD",
      list: [
        {
          href: "/orders",
          title: "Orders",
          iconName: "bag",
          count: ((orderData))?orderData.length: 0,
        },
        {
          href: "/wish-list",
          title: "Wishlist",
          iconName: "heart",
          count: 0,
        },
        // {
        //   href: "/support-tickets",
        //   title: "Support Tickets",
        //   iconName: "customer-service",
        //   count: 1,
        // },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        {
          href: "/profile",
          title: "Profile Info",
          iconName: "user",
          count: "",
        },
        {
          href: "/address",
          title: "Addresses",
          iconName: "pin",
          count: ((customerData.shipping_addresses))?customerData.shipping_addresses.length: 0,
        },
        // {
        //   href: "/payment-methods",
        //   title: "Payment Methods",
        //   iconName: "credit-card",
        //   count: 4,
        // },
      ],
    },
  ];

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};


const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboardNavigation);
