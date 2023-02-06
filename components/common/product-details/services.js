import React from "react";
import MasterServiceContent from "@/components/Service/MasterServiceContent";
import { services } from "@/services/script";

const Services = () => {
  return (
    <div className="collection-filter-block">
      <div className="product-service">
        {services.map((data, index) => {
          return (
            <MasterServiceContent
              key={index}
              link={data.link}
              title={data.title}
              service={data.service}
              lastChild={data.lastChild}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Services;
