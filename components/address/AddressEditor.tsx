import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";
import DashboardLayout from "../layout/CustomerDashboardLayout";
import ApiServices from '@config/ApiServices';
import ApiEndpoint from '@config/ApiEndpoint';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';  
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";



const AddressEditor = (props) => {

  const router = useRouter();

  const [getAddressRes, setgetAddress] = useState(
    {
    first_name : "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    company: "",
    postal_code: "",
    country_code:""
  }
  )
  const handleFormSubmit = async (values) => {
    const id = router.query.id;
    if(id != '0'){
      updateAddress(values);
    }else{
      addAddress(values)
    }

  };

  useEffect(() => {
    console.log('viewAddress', router)
    if (!!router && !!router.query.id) {
      const id = router.query.id;
      if(id != '0'){
        viewAddress(id);
        getAddress();
        console.log('getAddress')
      }
    }

  }, [router.isReady])




  const getAddress = async () => {

    console.log('getAddress cALLED');

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
        console.log('handle success');
        if (!!response && !!response.data.customer) {
          //toast.success('Succesfully get data');
          var addressList = response.data.customer.shipping_addresses;
          console.log(addressList, 'addressList');
          addressList.map((address) => {
              const id = router.query.id;
              console.log(id, address.id, "idmatched")
              if(address.id == id){
                  console.log('matched');
                  setgetAddress(address)
              }
          })
        } else {
          toast.error(response.data)
        }
        console.log(response.data.customer, 'response');
        

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }
  const viewAddress = async (id) => {
    //var deletedIndex = addresses.indexOf(id);
    var deletedIndex = -1;
    if (deletedIndex !== -1) {
      var headers = {
        "Content-Type": "application/json",
      }
      props.loaderRef(true)
      var dataRes = await ApiServices.GetApiCall(ApiEndpoint.RETRIVE_CUSTOMER_ADDRESS + "/" + id, headers)
      console.log(dataRes, 'patternDelete');
      props.loaderRef(false)
      if (!!dataRes && dataRes.status == true) {
        //setRefreshData(refreshData + 1);
        
        toast.success('Succesfully Deleted')
      } else {
        toast.error(dataRes.message)
      }
    }
  }

  const updateAddress = async (values) => {

    console.log(values);
    const instance = axios.create({
      withCredentials: true,
    })
    const id = router.query.id;

    const body = {
      first_name: values.first_name,
      last_name:values.last_name,
      city: values.city,
      //state: values.state,
      address_1: values.address_1,
      address_2: values.address_2,
      country_code: values.country_code,
      company: values.company,
      postal_code: values.postal_code,
    }
    instance.post(ApiEndpoint.ADD_ADDRESS_CUSTOMER + "/" + id, body)
      .then(function (response) {
        console.log('handle success');
        if (!!response && !!response.data.customer) {
          console.log(response, 'response');
          router.push('/address');
          toast.success('Succesfully Update Data');
          
        } else {
          toast.error(response.data)
        }
        console.log(response.data.customer, 'response');
        

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


    //var deletedIndex = addresses.indexOf(id);
    var deletedIndex = -1;
    if (deletedIndex !== -1) {
      var headers = {
        "Content-Type": "application/json",
      }
      props.loaderRef(true)
      var dataRes = await ApiServices.GetApiCall(ApiEndpoint.ADD_ADDRESS_CUSTOMER + "/" + id, headers)
      console.log(dataRes, 'patternDelete');
      props.loaderRef(false)
      if (!!dataRes && dataRes.status == true) {
        //setRefreshData(refreshData + 1);
        
        toast.success('Succesfully Deleted')
      } else {
        toast.error(dataRes.message)
      }
    }
  }

  const addAddress = async (values) => {

    console.log(values);
    const instance = axios.create({
      withCredentials: true,
    })
    const id = router.query.id;

    const body = {
      first_name: values.first_name,
      last_name:values.last_name,
      city: values.city,
      //state: values.state,
      address_1: values.address_1,
      address_2: values.address_2,
      country_code: !!values.country_code?values.country_code:"in",
      company: values.company,
      postal_code: values.postal_code,
    }
    instance.post(ApiEndpoint.ADD_ADDRESS_CUSTOMER, {address: body})
      .then(function (response) {
        console.log('handle success');
        if (!!response && !!response.data.customer) {
          console.log(response, 'response');
          router.push('/address');
          toast.success('Succesfully Add Data');
          
        } else {
          toast.error(response.data)
        }
        console.log(response.data.customer, 'response');
        

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


    //var deletedIndex = addresses.indexOf(id);
    var deletedIndex = -1;
    if (deletedIndex !== -1) {
      var headers = {
        "Content-Type": "application/json",
      }
      props.loaderRef(true)
      var dataRes = await ApiServices.GetApiCall(ApiEndpoint.ADD_ADDRESS_CUSTOMER + "/" + id, headers)
      console.log(dataRes, 'patternDelete');
      props.loaderRef(false)
      if (!!dataRes && dataRes.status == true) {
        //setRefreshData(refreshData + 1);
        
        toast.success('Succesfully Deleted')
      } else {
        toast.error(dataRes.message)
      }
    }
  }

  console.log(getAddressRes, 'getAddressRes');
  const initialValues = {
    first_name: getAddressRes.first_name,
    last_name:getAddressRes.last_name,
    city: getAddressRes.city,
    state: getAddressRes.state,
    address_1: !!getAddressRes.address_1?getAddressRes.address_1:"",
    address_2: !!getAddressRes.address_2?getAddressRes.address_2:"",
    company: !!getAddressRes.company?getAddressRes.company:"",
    postal_code: getAddressRes.postal_code,
    country_code: getAddressRes.country_code
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="pin_filled"
        title="Add New Address"
        button={
          <Link href="/address">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Address
            </Button>
          </Link>
        }
      />

      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    {console.log(values, 'values')}
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      errorText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name }
                      errorText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="address_1"
                      label="Address"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address_1 || ""}
                      errorText={touched.address_1 && errors.address_1}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="address_2"
                      label="Address 2"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address_2 || ""}
                      errorText={touched.address_2 && errors.address_2}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="city"
                      label="City"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city || ""}
                      errorText={touched.city && errors.city}
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      name="state"
                      label="State"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.state || ""}
                      errorText={touched.state && errors.state}
                    />
                  </Grid> */}

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="company"
                      label="Company"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.company}
                      errorText={touched.company && errors.company}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="postal_code"
                      label="Postal Code"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.postal_code || ""}
                      errorText={touched.postal_code && errors.postal_code}
                    />
                  </Grid>

                  <TextField
                      name="country_code"
                      fullwidth
                      type="hidden"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.country_code || ""}
                      errorText={touched.country_code && errors.country_code}
                    />

                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};



const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  address_1: yup.string().required("required"),
  address_2: yup.string().required("required"),
  city: yup.string().required("required"),
  // // state: yup.string().required("required"),
   company: yup.string().required("required"),
  postal_code: yup.string().required("required"),
});

AddressEditor.layout = DashboardLayout;

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressEditor);

