"use client";

import { Button } from "@/components/ui/button";
import useModalStore from "@/hooks/use-modal-store";

//this button is going to open an ADD-SERVICE modal
const AddUserBtn = () => {
  const { onOpen } = useModalStore();
  return (
    <div>
      <Button variant={"default"} onClick={() => onOpen("add-offered-service")}>
        Comenzar Servicio
      </Button>
    </div>
  );
};

export default AddUserBtn;
