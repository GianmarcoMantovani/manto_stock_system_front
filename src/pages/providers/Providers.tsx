import { HStack, useDisclosure } from "@chakra-ui/react";
import { Provider } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import EditButton from "./EditButton";
import DeleteButton from "../../components/DeleteButton";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateProviderModal from "./CreateProviderModal";

const format: DynamicTableCellFormat<Provider>[] = [
  {
    header: "Nombre",
    accessor: "company",
    isSortable: true,
  },
  {
    header: "Productos",
    accessor: "products",
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
        <EditButton provider={cell.row} />
        <DeleteButton
          id={cell.row.id}
          queryKey="provider"
          toastMessage="Proveedor borrado"
          resource="provider"
          mutationKey="deleteProvider"
        />
      </HStack>
    ),
  },
];

const Providers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      resource={"provider"}
      format={format}
      queryFilters={[]}
      perPage={10}
      tableTitle="Proveedores"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreateProviderModal
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

export default Providers;
