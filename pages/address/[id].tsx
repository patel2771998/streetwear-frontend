import AddressEditor from "@component/address/AddressEditor";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import React from "react";
import { useRouter } from 'next/router';

const AddressUpdater = (props) => {

  const router = useRouter();
  //console.log(router.pathname, 'patha', router.query.id);
   const DataList =  <AddressEditor />;
   return (

    <div>
      <DashboardLayout content={DataList} />
    </div>
  );
};

AddressUpdater.layout = DashboardLayout;

export default AddressUpdater;
