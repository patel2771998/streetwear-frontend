import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import React from "react";

const Orders = () => {
  const orderList =  <CustomerOrderList />;
  return (

    <div>
      <CustomerDashboardLayout content={orderList} />
    </div>
  );
};

Orders.layout = CustomerDashboardLayout;

export default Orders;
