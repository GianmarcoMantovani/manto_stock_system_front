import {
  Box,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import * as lodash from "lodash";
import { useMemo } from "react";
import { Sort } from "../../api/types";
import DynamicTablePagination from "./DynamicTablePagination";
import DynamicTableSort from "./DynamicTableSort";

export interface DynamicTableCellData<T> {
  row: T;
  index: number;
}

export interface DynamicTableCellFormat<T> {
  header: string;
  accessor: string;
  accessorFn?: (row: DynamicTableCellData<T>) => any;
  isSortable?: boolean;
}

interface Props<T> {
  format: DynamicTableCellFormat<T>[];
  data: any[];
  emptyMessage?: string;
  totalPages?: number;
  currentPage?: number;
  setCurrentPage?: (currentPage: number) => void;
  sort?: Sort;
  setSort?: (sort: Sort) => void;
  tableTitle?: string;
}

const DynamicTable = ({
  format,
  data,
  emptyMessage,
  totalPages,
  currentPage,
  setCurrentPage,
  sort,
  setSort,
  tableTitle,
}: Props<any>) => {
  const finalData = useMemo(
    () =>
      data.map((dataItem, index) => ({
        row: dataItem,
        index,
      })),
    [data]
  );

  return (
    <Box w={"90%"} maxW="full" overflowX="auto" borderRadius="1rem" p="2rem">
      <HStack w="full" justifyContent={"flex-end"}>
        <Text
          alignItems={"flex-start"}
          width={"100%"}
          color={"#454546"}
          fontSize={"1.5rem"}
          fontWeight={700}
        >
          {tableTitle}
        </Text>
        {totalPages !== undefined &&
          currentPage !== undefined &&
          setCurrentPage && (
            <DynamicTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
      </HStack>
      <Table
        w={"full"}
        overflow="hidden"
        variant="simple"
        colorScheme="blackAlpha"
        css={{
          boxShadow: "5px 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "1.25rem",
        }}
      >
        <Thead bgColor={"gray.800"}>
          <Tr>
            {format.map((f, _i) => (
              <Th key={JSON.stringify({ ...f, _i })} color="white" py="1rem">
                <HStack justifyContent={"center"}>
                  <Heading
                    style={{ textTransform: "none" }}
                    fontSize="xl"
                    fontWeight="light"
                  >
                    {f.header}
                  </Heading>
                  {f.isSortable && sort && setSort && (
                    <DynamicTableSort
                      accessor={f.accessor}
                      setSort={setSort}
                      sort={sort}
                    />
                  )}
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody bgColor={"whitesmoke"} color="tertiary">
          {!data.length && (
            <Tr>
              <Td colSpan={format.length} color="gray.500">
                {emptyMessage || "No items"}
              </Td>
            </Tr>
          )}
          {data.map((_, rowIndex) => (
            <Tr key={rowIndex} fontSize={"sm"}>
              {format.map((f, _i) => (
                <Td textAlign={"center"} key={JSON.stringify({ ...f, _i })}>
                  {f.accessorFn
                    ? f.accessorFn(finalData[rowIndex])
                    : lodash.get(finalData[rowIndex].row, f.accessor)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DynamicTable;
