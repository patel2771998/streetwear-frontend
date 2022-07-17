import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import React from "react";
import ApiServices from '@config/ApiServices';
import ApiEndpoint from '@config/ApiEndpoint';
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import axios from "axios";

const AddressList = (props) => {

  const router = useRouter();
  const [deleteId, setDeleteId] = useState('');
  const [refreshData, setRefreshData] = useState(0);
  const [addresses, setAddresses] = useState([]);

  console.log(props, 'props');

  useEffect(() => {
    if (!!props.router && !!props.router.id) {
      const id = props.router.id;
      //viewAddress(id);
    }
    getAddress();

  }, [router.isReady])



  const deleteAddress = async (id) => {
    //console.log(id);
    // var deletedIndex = addresses.indexOf(id);
    // if (deletedIndex !== -1) {
      var headers = {
        "Content-Type": "application/json",
      }
      //props.loaderRef(true)
      const instance = axios.create({
        withCredentials: true,
      })
      instance.delete(ApiEndpoint.ADD_ADDRESS_CUSTOMER + "/" + id)
      .then(function (response) {
        // handle success
        if (!!response && !!response.data.customer) {
          var orderList = response.data.customer.shipping_addresses;
          setAddresses(orderList)
        } else {
          toast.error(response.data)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      // var patternDelete = await ApiServices.DeleteApiCall(ApiEndpoint.RETRIVE_CUSTOMER_ADDRESS + "/" + id, headers)
      // console.log(patternDelete, 'patternDelete');
      // props.loaderRef(false)
      // if (!!patternDelete && patternDelete.status == true) {
      //   setRefreshData(refreshData + 1);
      //   toast.success('Succesfully Deleted')
      // } else {
      //   toast.error(patternDelete.message)
      // }
    // }

  }

  const viewAddress = async (id) => {
    //console.log('Test ', "FFF");
    //console.log(id);
    var deletedIndex = addresses.indexOf(id);
    if (deletedIndex !== -1) {
      var headers = {
        "Content-Type": "application/json",
      }
      props.loaderRef(true)
      var patternDelete = await ApiServices.GetApiCall(ApiEndpoint.RETRIVE_CUSTOMER + "/" + id, headers)
      console.log(patternDelete, 'patternDelete');
      props.loaderRef(false)
      if (!!patternDelete && patternDelete.status == true) {
        setRefreshData(refreshData + 1);
        toast.success('Succesfully Deleted')
      } else {
        toast.error(patternDelete.message)
      }
    }
  }
  const getAddress = async () => {

    console.log(props);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const instance = axios.create({
      withCredentials: true,
    })
    instance.get(ApiEndpoint.RETRIVE_CUSTOMER)
      .then(function (response) {
        // handle success
        if (!!response && !!response.data.customer) {
          var orderList = response.data.customer.shipping_addresses;
          setAddresses(orderList)
        } else {
          toast.error(response.data)
        }
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
      //getAddress();

    }
  }, [props]);

  const DataList =
    <div>
      <DashboardPageHeader
        title="My Addresses"
        iconName="pin_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem" onClick={ () => {
            router.push('/address/0')
          }}>
            Add New Address
          </Button>
        }
      />

      {addresses.map((address) => (
        <TableRow my="1rem" padding="6px 18px">
          <Typography className="pre" m="6px" textAlign="left">
            {address.first_name + " " + address.last_name}

          </Typography>
          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            {address.address_1 + " " + address.address_1 + " " + address.city + " " + address.country_code + " , " + address.postal_code}
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            {address.phone}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={'/address/' + address.id}>
              <Typography as="a" href={'/address/' + address.id} color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={() => deleteAddress(address.id)}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
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


  return (

    <div>
      <DashboardLayout content={DataList} />
    </div>
  );
};



AddressList.layout = DashboardLayout;
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
