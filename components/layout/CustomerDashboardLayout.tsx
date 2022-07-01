import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import CustomerDashboardNavigation from "./CustomerDashboardNavigation";

const CustomerDashboardLayout = ({content}) => (
    <Container my="2rem">
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <CustomerDashboardNavigation />
        </Hidden>
        <Grid item lg={9} xs={12}>
          {content}
          {console.log(content)}
        </Grid>
      </Grid>
    </Container>
);

export default CustomerDashboardLayout;
