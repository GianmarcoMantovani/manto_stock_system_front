import { Icon, VStack } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Sort } from "../../api/types";

interface Props {
    accessor: string;
    sort: Sort;
    setSort: (sort: Sort) => void;
}

const commonProps = {};

const DynamicTableSort = ({ accessor, sort, setSort }: Props) => {
    const onClick = () => {
        if (sort.field === accessor) {
            setSort({
                field: sort.field,
                isAscending: !sort.isAscending,
            });
        } else {
            setSort({
                field: accessor,
                isAscending: true,
            });
        }
    };

    return (
        <VStack spacing={0} cursor="pointer" onClick={onClick}>
            <Icon
                as={IoIosArrowUp}
                {...commonProps}
                color={
                    accessor === sort.field && sort.isAscending
                        ? "tertiary"
                        : "white"
                }
            />
            <Icon
                as={IoIosArrowDown}
                {...commonProps}
                color={
                    accessor === sort.field && !sort.isAscending
                        ? "tertiary"
                        : "white"
                }
            />
        </VStack>
    );
};

export default DynamicTableSort;
