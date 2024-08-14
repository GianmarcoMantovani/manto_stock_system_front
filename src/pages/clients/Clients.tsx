import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Client, ClientTypeEnum } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import EditButton from "./EditButton";
import DeleteButton from "../../components/DeleteButton";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateClientModal from "./CreateClientModal";
import ClientsFilters from "./ClientsFilters";
import { useState } from "react";

const format: DynamicTableCellFormat<Client>[] = [
  {
    header: "Nombre",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Tipo de Cliente",
    accessor: "clientTypeEnum",
    accessorFn: (r) => <Text>{ClientTypeEnum[r.row.clientTypeEnum]}</Text>,
    isSortable: false,
  },
  {
    header: "Direccion",
    accessor: "address",
    isSortable: true,
  },
  {
    header: "Contacto",
    accessor: "phoneNumber",
    isSortable: false,
  },
  {
    header: "Horarios",
    accessor: "attentionHours",
    isSortable: false,
  },
  {
    header: "Ciudad",
    accessor: "city.name",
    isSortable: true,
  },
  {
    header: "Editar/Borrar",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        <EditButton client={cell.row} />
        <DeleteButton
          id={cell.row.id}
          queryKey="client"
          toastMessage="Cliente borrado"
          resource="client"
          mutationKey="deleteClient"
        />
      </HStack>
    ),
  },
];

const Clients = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [clientTypeEnum, setClientTypeEnum] = useState<number | null>(null);

  return (
    <MainLayout
      resource={"client"}
      format={format}
      filters={
        <ClientsFilters
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          cityId={cityId}
          setCityId={setCityId}
          clientTypeEnum={clientTypeEnum}
          setClientTypeEnum={setClientTypeEnum}
        />
      }
      queryFilters={[
        {
          field: "name",
          value: name,
        },
        {
          field: "phoneNumber",
          value: phoneNumber,
        },
        {
          field: "clientTypeEnum",
          value: clientTypeEnum,
        },
        {
          field: "city.id",
          value: cityId,
        },
      ]}
      perPage={10}
      tableTitle="Clientes"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreateClientModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          }
        />
      }
    />
  );
};

export default Clients;
