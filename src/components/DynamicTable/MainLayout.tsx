import {
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import DynamicTable, { DynamicTableCellFormat } from "./DynamicTable";
import { ApiListResponse, FilterItem, Sort } from "../../api/types";
import { client } from "../../api/api";
import { currentPageToAPIRange, sortToAPISort, filtersToAPIFormat } from "../../api/utils";

interface Props {
  resource: string;
  format: DynamicTableCellFormat<any>[];
  buttons?: ReactNode;
  filters?: ReactNode;
  queryFilters: FilterItem[];
  tableTitle?: string;
  perPage: number;
  sortField?: string;
}

const MainLayout = ({
  resource,
  format,
  buttons,
  queryFilters,
  filters,
  tableTitle,
  perPage,
  sortField
}: Props) => {
  const getAuthHeader = useAuthHeader();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<Sort>({
    field: sortField ? sortField : "name",
    isAscending: false,
  });

  const [debouncedFilters, setDebouncedFilters] =
    useState<FilterItem[]>(queryFilters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilters(queryFilters);
    }, 500);

    return () => clearTimeout(timeout);
  }, [queryFilters]);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [resource, currentPage, sort, debouncedFilters],
    queryFn: () =>
      client.get<ApiListResponse<any>>(`/${resource}`, {
        headers: {
          Authorization: getAuthHeader,
        },
        params: {
          ...currentPageToAPIRange(currentPage, perPage),
          ...sortToAPISort(sort),
          filters: filtersToAPIFormat(debouncedFilters),
        },
      }),
    select: (r) => r.data,
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [sort, debouncedFilters]);

  return (
    <Flex w="full" h="full">
      <VStack w="full" alignItems={"flex-end"} borderRadius={"10"}>
        <HStack w="full" justifyContent={"flex-end"} pe={10} mt={8}>
          {filters}
          {buttons}
        </HStack>
        {(isError || isLoading) && (
          <Center w="full" h="full">
            {isLoading && <Spinner size={"xl"} color="black" />}
            {isError && (
              <Heading color="red">There was an error, try again later</Heading>
            )}
          </Center>
        )}
        {isSuccess && (
          <DynamicTable
            tableTitle={tableTitle}
            data={response.items}
            format={format}
            totalPages={Math.ceil(response.totalCount / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            sort={sort}
            setSort={setSort}
          />
        )}
      </VStack>
    </Flex>
  );
};
export default MainLayout;
