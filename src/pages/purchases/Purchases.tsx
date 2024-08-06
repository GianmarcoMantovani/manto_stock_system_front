import { HStack, useDisclosure, Text } from "@chakra-ui/react";
import { Purchase } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import EditButton from "./EditButton";
import DeleteButton from "../../components/DeleteButton";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreatePurchaseModal from "./CreatePurchaseModal";
import moment from "moment";

const format: DynamicTableCellFormat<Purchase>[] = [
  {
    header: "Compra",
    accessor: "products",
    isSortable: true,
  },
  {
    header: "Notas",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Fecha Compra",
    accessor: "date",
    accessorFn: (r) => (
      <Text>{moment.utc(r.row.date).format("DD-MM-yyyy")}</Text>
    ),
    isSortable: true,
  },
  {
    header: "Monto",
    accessor: "amount",
    accessorFn: (r) => (
      <Text>
          ${r.row.amount}
      </Text>
  ),
    isSortable: true,
  },
  {
    header: "Proveedor",
    accessor: "provider.company",
    isSortable: true,
  },
  {
    header: "Editar/Borrar",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        <EditButton purchase={cell.row} />
        <DeleteButton
          id={cell.row.id}
          queryKey="purchase"
          toastMessage="Compra borrada"
          resource="purchase"
          mutationKey="deletePurchase"
        />
      </HStack>
    ),
  },
];

const Purchases = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      resource={"purchase"}
      format={format}
      queryFilters={[]}
      perPage={10}
      tableTitle="Compras"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreatePurchaseModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          }
        />
      }
      sortField={"products"}
    />
  );
};

export default Purchases;
