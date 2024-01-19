import React, { useState } from "react";

// Components
import Modal from "@/components/ui/modal";
import { CountryColumn } from "./Columns";
import CountryForm from "./Form";

interface CellActionProps {
  data: CountryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <Modal
        title="Country Catalog"
        description=""
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className=" w-[70rem] bg-white"
      >
        <CountryForm initialData={data} />
      </Modal>
      <div
        className=" cursor-pointer w-full"
        onClick={() => setIsOpenModal(true)}
      >
        {data.officialName}
      </div>
    </>
  );
};
