import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApiServices from '/config/ApiServices';
import ApiEndpoint from '/config/ApiEndpoint';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '../constants/actionTypes';
import styles from "../styles/login.module.css";

const Register = (props) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      fname: '',
      lname: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      
      fname: Yup
        .string()
        .max(255)
        .required(
          'First Name is required'),
      lname: Yup
          .string()
          .max(255)
          .required(
            'Last Name is required'),
      email: Yup
          .string()
          .email(
            'Must be a valid email')
          .max(255)
          .required(
            'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      onRegisterPress()
    }
  });

  const onRegisterPress = async () => {
    var body = {
      'password': formik.values.password,
      'first_name': formik.values.fname,
      'last_name': formik.values.lname,
      'email': formik.values.email
    }
    var headers = {
      "Content-Type": "application/json",
    }
    //props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.REGISTER_USER, JSON.stringify(body), headers);
    //props.loaderRef(false)
    console.log(data, 'data');
    //props.loaderRef(true)
   
    if (!!data) {
      if (data.customer) {
        props.save_user_data({ user: data.customer });
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
        <title>
          Register | Stret
        </title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.fname && formik.errors.fname)}
              fullWidth
              helperText={formik.touched.fname && formik.errors.fname}
              label="First Name"
              margin="normal"
              name="fname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fname}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.lname && formik.errors.lname)}
              fullWidth
              helperText={formik.touched.lname && formik.errors.lname}
              label="Last Name"
              margin="normal"
              name="lname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lname}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="E-mail"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="outlined"
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                    sx={{
                      cursor: 'pointer',
                      color: "#967844"
                    }}
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className={styles.button}

              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer',
                    color: "#967844"
                  }}
                >
                  Sign In
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
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
