import React from "react";

interface ServicePageParams {
  params: {
    serviceId: string;
  };
}

const ServicePage: React.FC<ServicePageParams> = async ({ params }) => {
  const { serviceId } = await params; // Await params to ensure it's resolved.

  return <div>ServicePage for ID: {serviceId}</div>;
};

export default ServicePage;
