"use client";

import AddOfferedServiceModal from "@/modals/add-service-modal.";
import { useEffect, useState } from "react";

//global provider for modals
const ModalProvider = () => {
  //make sure we are on the clientside
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    //we are still on the server
    return null;
  }
  return (
    <>
      <AddOfferedServiceModal />
    </>
  );
};

export default ModalProvider;
