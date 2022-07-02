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


const AddressList = (props) => {

  const router = useRouter();
  const [deleteId, setDeleteId] = useState('');
  const [refreshData, setRefreshData] = useState(0);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!!props.router && !!props.router.id ) {
        const id = props.router.id;
        viewAddress(id);
    }
  }, [router.isReady])

  
  
  const deleteAddress = async (id) => {
      //console.log(id);
      var deletedIndex = addresses.indexOf(id);
      if (deletedIndex !== -1) {
        var headers = {
            "Content-Type": "application/json",
        }
        props.loaderRef(true)
        var patternDelete = await ApiServices.DeleteApiCall(ApiEndpoint.RETRIVE_CUSTOMER_ADDRESS + "/" + id, headers)
        console.log(patternDelete,'patternDelete');
        props.loaderRef(false)
        if (!!patternDelete && patternDelete.status == true) {
            setRefreshData(refreshData + 1);
            toast.success('Succesfully Deleted')
        } else {
            toast.error(patternDelete.message)
        }
      }

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
        var patternDelete = await ApiServices.GetApiCall(ApiEndpoint.RETRIVE_CUSTOMER_ADDRESS + "/" + id, headers)
        console.log(patternDelete,'patternDelete');
        props.loaderRef(false)
        if (!!patternDelete && patternDelete.status == true) {
            setRefreshData(refreshData + 1);
            toast.success('Succesfully Deleted')
        } else {
            toast.error(patternDelete.message)
        }
      }
  }
  const DataList = 
    <div>
      <DashboardPageHeader
        title="My Addresses"
        iconName="pin_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Add New Address
          </Button>
        }
      />

      {orderList.map(() => (
        <TableRow my="1rem" padding="6px 18px">
          <Typography className="pre" m="6px" textAlign="left">
            Ralf Edward
          </Typography>
          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            777 Brockton Avenue, Abington MA 2351
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            +1927987987498
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href="/address/xkssThds6h37sd">
              <Typography as="a" href="/address/xkssThds6h37sd" color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={() => deleteAddress('xkssThds6h37sd') }>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  

  return (

    <div>
      <DashboardLayout content={DataList} />
    </div>
  );
};

const orderList = [
  {
    orderNo: "1050017AS",
    status: "Pending",
    purchaseDate: new Date(),
    price: 350,
  },
  {
    orderNo: "1050017AS",
    status: "Processing",
    purchaseDate: new Date(),
    price: 500,
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
  },
  {
    orderNo: "1050017AS",
    status: "Cancelled",
    purchaseDate: "2020/12/15",
    price: 300,
  },
];

AddressList.layout = DashboardLayout;

export default AddressList;