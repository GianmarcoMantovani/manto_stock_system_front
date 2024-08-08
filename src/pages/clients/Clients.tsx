import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Client, ClientTypeEnum } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import EditButton from "./EditButton";
import DeleteButton from "../../components/DeleteButton";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateClientModal from "./CreateClientModal";

const format: DynamicTableCellFormat<Client>[] = [
  {
    header: "Nombre",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Tipo de Cliente",
    accessor: "clientTypeEnum",
    accessorFn: (r) => (
      <Text>{ClientTypeEnum[r.row.clientTypeEnum]}</Text>
    ),
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

  return (
    <MainLayout
      resource={"client"}
      format={format}
      queryFilters={[]}
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
