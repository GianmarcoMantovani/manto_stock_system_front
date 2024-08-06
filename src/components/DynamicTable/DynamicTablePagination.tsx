import { HStack, IconButton, Text } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (currentPage: number) => void;
}

const DynamicTablePagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}: Props) => {
    return (
        <HStack p={2}>
            <IconButton
                icon={<MdChevronLeft size={20} />}
                aria-label="Página anterior"
                colorScheme={"whiteAlpha"}
                color={"#454546"}
                size="sm"
                isDisabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                variant="link"
            />
            <Text color={"#454546"}>
                {currentPage + 1}/{totalPages || 1}
            </Text>
            <IconButton
                icon={<MdChevronRight size={20} />}
                aria-label="Página siguiente"
                colorScheme={"whiteAlpha"}
                size="sm"
                isDisabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                variant="link"
                color={"#454546"}
            />
        </HStack>
    );
};

export default DynamicTablePagination;
