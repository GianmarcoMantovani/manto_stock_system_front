import {
  chakra,
  SimpleGrid,
  useToast,
  GridItem,
  HStack,
  Button,
  VStack,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postResource } from "../../api/api";
import { ProductionItemCreation } from "../../api/types";
import AddItemPopover from "./AddItemPopover";
import ProductionItem from "./ProductionItem";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number().required("Debe seleccionar un producto"),
      amount: Yup.number().required("Debe indicar un monto"),
    })
  )
});

const initialValues = {
  items: []
};

const CreateProductionForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await postProduction();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["production"] });
    toast({
      title: "Produccion creada",
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const onError = (err: AxiosError) => {
    console.log(err);
    toast({
      title: "Error",
      description: <>{err?.response?.data || "Try again later"}</>,
      status: "error",
    });
  };

  const { mutateAsync: postProduction, isPending: creationLoading } = useMutation(
    {
      mutationKey: ["postProduction"],
      mutationFn: () => postResource("production", getAuthHeader, formik.values),
      onSuccess: onSuccess,
      onError: onError,
    }
  );

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <GridItem>
        <VStack alignItems={"flex-start"} spacing={1}>
          <HStack alignItems={"flex-start"} spacing={1}>
            <FormLabel>Producciones</FormLabel>
            <AddItemPopover
              addProdItem={(p: ProductionItemCreation) =>
                formik.setFieldValue("items", [
                  ...formik.values.items,
                  p,
                ])
              }
            />
          </HStack>
          {formik.values.items.length < 1 && (
            <Text color="gray.500">
              Todavia no se cargaron producciones
            </Text>
          )}
          <VStack alignItems={"flex-start"} spacing={3}>
            {formik.values.items.map((p, _i) => (
              <ProductionItem
                key={_i}
                productionItem={p}
                removeItem={() =>
                  formik.setFieldValue(
                    "items",
                    formik.values.items.filter(
                      (_p, i) => i !== _i
                    )
                  )
                }
              />
            ))}
          </VStack>
        </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <HStack w="full" justifyContent={"flex-end"} spacing={5} p={5}>
            <Button type="button" onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme={"orange"}
              isLoading={creationLoading}
              isDisabled={creationLoading}
            >
              Crear
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default CreateProductionForm;
