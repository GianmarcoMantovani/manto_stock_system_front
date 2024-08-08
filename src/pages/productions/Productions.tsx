import { Text, useDisclosure } from "@chakra-ui/react";
import { Production } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateProductionModal from "./CreateProductionModal";
import moment from "moment";
import ProductionViewButton from "./DetailedView/ProductionViewButton";

const format: DynamicTableCellFormat<Production>[] = [
  {
    header: "Total Producido",
    accessor: "totalProduction",
    isSortable: false,
  },
  {
    header: "Fecha Produccion",
    accessor: "date",
    accessorFn: (r) => (
      <Text>{moment.utc(r.row.date).format("DD-MM-yyyy")}</Text>
    ),
    isSortable: true,
  },
  {
    header: "VER PRODUCCION",
    accessor: "",
    accessorFn: (r) => <ProductionViewButton productionId={r.row.id} />,
    isSortable: false,
  },
];

const Productions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      resource={"production"}
      format={format}
      queryFilters={[]}
      perPage={10}
      tableTitle="Producciones"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreateProductionModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          }
        />
      }
      sortField={"date"}
    />
  );
};

export default Productions;
