import { Box, GridItem, Text } from "@chakra-ui/react";

interface Props {
  resource: string;
  label: string;
}

const DetailedViewBody = ({ resource, label }: Props) => {
  return (
    <GridItem colSpan={1}>
      <Text fontWeight={"bold"}>{label}</Text>
      <Box
        background={"#F5F5F5"}
        borderRadius={"5px"}
        width={"100%"}
        height={"3rem"}
        cursor={"default"}
        paddingLeft={"1rem"}
        color={"#EF810E"}
        fontWeight={"bold"}
      >
        {<Text>{resource}</Text>}
      </Box>
    </GridItem>
  );
};

export default DetailedViewBody;
