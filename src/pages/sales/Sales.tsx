import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Sale } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import moment from "moment";
import CreateSaleModal from "./CreateSaleModal";
import SaleViewButton from "./DetailedView/SaleViewButton";
import EditButton from "./EditButton";
import { useState } from "react";
import SalesFilters from "./SalesFilters";

const format: DynamicTableCellFormat<Sale>[] = [
  {
    header: "Notas",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Cliente",
    accessor: "client.name",
    isSortable: true,
  },
  {
    header: "Fecha Venta",
    accessor: "date",
    accessorFn: (r) => (
      <Text>{moment.utc(r.row.date).format("DD-MM-yyyy")}</Text>
    ),
    isSortable: true,
  },
  {
    header: "Precio Total",
    accessor: "totalPrice",
    accessorFn: (r) => <Text>${r.row.totalPrice}</Text>,
    isSortable: true,
  },
  {
    header: "Cobrada",
    accessor: "sold",
    accessorFn: (r) => <Text>{r.row.sold ? "Si" : "No"}</Text>,
    isSortable: true,
  },
  {
    header: "Editar",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        {cell.row.sold === false && <EditButton sale={cell.row} />}
      </HStack>
    ),
  },
  {
    header: "VER VENTA",
    accessor: "",
    accessorFn: (r) => <SaleViewButton saleId={r.row.id} />,
    isSortable: false,
  },
];

const Sales = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clientId, setClientId] = useState<number | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sold, setSold] = useState(true);

  return (
    <MainLayout
      resource={"sale"}
      format={format}
      filters={
        <SalesFilters
          clientId={clientId}
          setClientId={setClientId}
          to={to}
          setTo={setTo}
          from={from}
          setFrom={setFrom}
          sold={sold}
          setSold={setSold}
        />
      }
      queryFilters={[
        {
          field: "sold",
          value: sold,
        },
        {
          field: "client.id",
          value: clientId,
        },
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
      tableTitle="Ventas"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreateSaleModal
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

export default Sales;
