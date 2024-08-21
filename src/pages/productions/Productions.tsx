import { Text, useDisclosure } from "@chakra-ui/react";
import { Production } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateProductionModal from "./CreateProductionModal";
import moment from "moment";
import ProductionViewButton from "./DetailedView/ProductionViewButton";
import ProductionsFilters from "./ProductionsFilters";
import { useState } from "react";

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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <MainLayout
      resource={"production"}
      format={format}
      filters={
        <ProductionsFilters
          to={to}
          setTo={setTo}
          from={from}
          setFrom={setFrom}
        />
      }
      queryFilters={[
        {
          field: "date_bgr",
          value: from !== "" ? from : undefined,
        },
        {
          field: "date_sml",
          value: to !== "" ? to : undefined,
        },
      ]}
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
