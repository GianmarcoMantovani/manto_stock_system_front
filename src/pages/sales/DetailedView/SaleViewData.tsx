import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { Sale } from "../../../api/types";
import DetailedViewBody from "../../../components/DetailedViewBody";

interface Props {
  sale: Sale;
}

const SaleViewData = ({ sale }: Props) => {
  return (
    <VStack>
      <Box alignItems={"center"} paddingTop={1} w={"100%"}>
        <VStack
          align={"center"}
          justify={"center"}
          bgColor={"#FFFFFF"}
          borderRadius={"1.18rem"}
          boxShadow={"md"}
          padding={"0.5rem"}
          alignItems={"center"}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} width={"80%"}>
            <DetailedViewBody resource={sale.client.name} label={"Cliente"} />
            <DetailedViewBody
              resource={moment.utc(sale.date).format("DD-MM-yyyy")}
              label={"Fecha Venta"}
            />
            <DetailedViewBody
              resource={"$" + sale.totalPrice.toString()}
              label={"Precio Total"}
            />
          </SimpleGrid>
          <VStack>
            <Text
              justifyContent={"center"}
              align={"center"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              mt={5}
              mb={2}
            >
              PRODUCTOS
            </Text>
          </VStack>
          {sale.items.map((item) => (
            <>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={5}
                width={"80%"}
                mb={5}
              >
                <DetailedViewBody
                  resource={item.product.name}
                  label={"Producto"}
                />
                <DetailedViewBody
                  resource={item.amount.toString()}
                  label={"Cantidad"}
                />
                <DetailedViewBody
                  resource={"$" + item.unitPrice.toString()}
                  label={"Precio Unitario"}
                />
              </SimpleGrid>
            </>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default SaleViewData;
