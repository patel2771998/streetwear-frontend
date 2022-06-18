import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import styles from "../styles/login.module.css";
import ApiServices from '/config/ApiServices';
import ApiEndpoint from '/config/ApiEndpoint';

const Login = (props) => {
//   useEffect(() => {
//     console.log('props....', props)
//     console.log('BASE_API_URL', Constants.BASE_API_URL );
//   }, [])
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required(
          'Username is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      onLoginPress()
    }
  });

  const onLoginPress = async () => {
    //props.loaderRef(true)
    var body = {
      'email': formik.values.username,
      'password': formik.values.password
    }
    var headers = {
      "Content-Type": "application/json",
    }
    var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
    //props.loaderRef(false)

    console.log(data, 'data');
    if(!!data){
        if(data.customer){
            console.log('customer');
            if(data.customer.id){

            }
        }else{
            console.log('data');
        }
    }
    let stack = 'jasoliyavaishali12@gmail.com:123456';
  let buff = new Buffer(stack);
  let base64data = buff.toString('base64');
    console.log('base64data', base64data)
    if (!!data) {
      if (data.status) {
        data.userData.token = data.token;
        data.userData.currentAccount = data.userData.account[0];
        props.save_user_data({ user: data.userData });
        router.push('/');
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }

  }

  

  return (
    <>
      <Head>
        <title>Login | Street</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm" className={styles.logincontainer}>
          <form onSubmit={formik.handleSubmit} >
            <Box sx={{ my: 3 }}>
              
              <Typography
                color="textPrimary"
                variant="h4"
                  
              >
                Sign in
              </Typography>
              
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              variant="outlined"
              color="secondary"
            />

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className={styles.button}
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer',
                    color: "#967844"
                  }}
                 
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }, showToast('message', true)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);