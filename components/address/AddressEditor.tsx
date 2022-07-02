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
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const AddressEditor = (props) => {

  const router = useRouter();
  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (!!props.router && !!props.router.query.id ) {
        const id = props.router.query.id;
        viewAddress(id);
    }
  }, [router.isReady])

  const viewAddress = async (id) => {
      //var deletedIndex = addresses.indexOf(id);
      var deletedIndex = -1;
      if (deletedIndex !== -1) {
        var headers = {
            "Content-Type": "application/json",
        }
        props.loaderRef(true)
        var patternDelete = await ApiServices.GetApiCall(ApiEndpoint.RETRIVE_CUSTOMER_ADDRESS + "/" + id, headers)
        console.log(patternDelete,'patternDelete');
        props.loaderRef(false)
        if (!!patternDelete && patternDelete.status == true) {
            //setRefreshData(refreshData + 1);
            toast.success('Succesfully Deleted')
        } else {
            toast.error(patternDelete.message)
        }
      }
  }

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
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="address_1"
                      label="Address"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="address_2"
                      label="Address 2"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address || ""}
                      errorText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="city"
                      label="City"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      errorText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="state"
                      label="State"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      errorText={touched.contact && errors.contact}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="company"
                      label="Company"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact || ""}
                      errorText={touched.contact && errors.contact}
                    />
                  </Grid>
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

const initialValues = {
  name: "",
  address: "",
  contact: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  contact: yup.string().required("required"),
});

AddressEditor.layout = DashboardLayout;

export default AddressEditor;
