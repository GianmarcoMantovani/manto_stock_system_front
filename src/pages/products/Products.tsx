import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Product } from "../../api/types";
import { DynamicTableCellFormat } from "../../components/DynamicTable/DynamicTable";
import EditButton from "./EditButton";
import DeleteButton from "../../components/DeleteButton";
import MainLayout from "../../components/DynamicTable/MainLayout";
import AddNewButton from "../../components/AddNewButton";
import CreateProductModal from "./CreateProductModal";
import ProductsFilters from "./ProductsFilters";
import { useState } from "react";

const format: DynamicTableCellFormat<Product>[] = [
  {
    header: "Nombre",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Stock",
    accessor: "stock",
    isSortable: true,
  },
  {
    header: "Peso",
    accessor: "weight",
    accessorFn: (r) => <Text>{r.row.weight}g</Text>,
    isSortable: true,
  },
  {
    header: "Descripcion",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Editar/Borrar",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        <EditButton product={cell.row} />
        <DeleteButton
          id={cell.row.id}
          queryKey="product"
          toastMessage="Producto borrado"
          resource="product"
          mutationKey="deleteProduct"
        />
      </HStack>
    ),
  },
];

const Products = () => {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      resource={"product"}
      format={format}
      filters={<ProductsFilters name={name} setName={setName} />}
      queryFilters={[
        {
          field: "name",
          value: name,
        },
      ]}
      perPage={10}
      tableTitle="Productos"
      buttons={
        <AddNewButton
          onOpen={onOpen}
          component={
            <CreateProductModal
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

export default Products;
