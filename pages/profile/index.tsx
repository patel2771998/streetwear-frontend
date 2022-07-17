import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import CustomerDashboardLayout from "../../components/layout/CustomerDashboardLayout";
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import ApiServices from 'config/ApiServices';
import ApiEndpoint from 'config/ApiEndpoint';
import { toast } from 'react-toastify';

const Profile = (props) => {

  const onLoginPress = async () => {
    //props.loaderRef(true)
    var headers = {
      "Content-Type": "application/json",
    }
    var data = await ApiServices.GetApiCall(ApiEndpoint.RETRIVE_CUSTOMER, headers);
    //props.loaderRef(false)
    console.log(data, 'Profiledata');
    if (!!data) {
      if (data.customer) {
        console.log(data.customer, 'data.customer');
        //props.save_user_data({ user: data.userData });
        //props.save_user_data({ user: data.customer });
        //console.log(props);
        //router.push('/about');
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
  }
  console.log(onLoginPress, 'Profiledata', '');


  const firstName = props.profile.first_name;
  const lastName = props.profile.last_name;
  const email = props.profile.email;
  const phone = props.profile.phone;
  const infoList = [
    {
      title: ((props.profile.orders))?props.profile.orders.length: 0,
      //title: 0,
      subtitle: "All Orders",
    },
    // {
    //   title: "02",
    //   subtitle: "Awaiting Payments",
    // },
    // {
    //   title: "00",
    //   subtitle: "Awaiting Shipment",
    // },
    // {
    //   title: "01",
    //   subtitle: "Awaiting Delivery",
    // },
  ];

  const content = 
  <>
      <DashboardPageHeader
          iconName="user_filled"
          title="My Profile"
          button={
            <Link href="/profile/edit">
              <Button color="primary" bg="primary.light" px="2rem">
                Edit Profile
              </Button>
            </Link>
          }
        />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src="/assets/images/faces/ralph.png" size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{ firstName + " " + lastName}</H5>
                    <FlexBox alignItems="center">
                      {/* <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        $500
                      </Typography> */}
                    </FlexBox>
                  </div>

                  {/* <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography> */}
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={4} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            First Name
          </Small>
          <span>{firstName}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
          Last Name
          </Small>
          <span>{lastName}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>{email}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>
          <span>{phone}</span>
        </FlexBox>
          {/* <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Birth date
            </Small>
            <span className="pre">
              {format(new Date(1996 / 11 / 16), "dd MMM, yyyy")}
            </span>
          </FlexBox> */}
      </TableRow>
  </>
;
  return (

    <div>
      <CustomerDashboardLayout content={content} />
    </div>
  );
};




const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

Profile.layout = DashboardLayout;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



