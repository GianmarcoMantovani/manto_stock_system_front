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
import { SaleItemCreation } from "../../api/types";
import AddItemPopover from "./AddItemPopover";
import SaleItem from "./SaleItem";
import FormikInput from "../../components/FormikInput";
import SyncField from "../../components/Dropdowns/SyncField";

interface Props {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().nullable(),
  clientId: Yup.number().required("Debe indicar un cliente"),
  items: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number().required("Debe seleccionar un producto"),
      amount: Yup.number().required("Debe indicar un monto"),
    })
  ),
  totalPrice: Yup.number().required("Debe indicar el monto total de compra"),
});

const initialValues = {
  description: "",
  clientId: 0,
  items: [],
  totalPrice: 0,
};

const CreateSaleForm = ({ onClose }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await postSale();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["sale"] });
    toast({
      title: "Venta creada",
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

  const { mutateAsync: postSale, isPending: creationLoading } = useMutation({
    mutationKey: ["postSale"],
    mutationFn: () => postResource("sale", getAuthHeader, formik.values),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <FormikInput
            label="Notas"
            isRequired={true}
            name={"description"}
            id={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            error={formik.errors.description}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SyncField
            setter={(value: number | null) =>
              formik.setFieldValue("clientId", value, true)
            }
            error={formik.errors.clientId}
            touched={formik.touched.clientId}
            isRequired
            defaultValue={undefined}
            resource={"client"}
            title={"Cliente"}
          />
        </GridItem>
        <GridItem>
          <VStack alignItems={"flex-start"} spacing={1}>
            <HStack alignItems={"flex-start"} spacing={1}>
              <FormLabel>Productos</FormLabel>
              <AddItemPopover
                addSaleItem={(p: SaleItemCreation) =>
                  formik.setFieldValue("items", [...formik.values.items, p])
                }
              />
            </HStack>
            {formik.values.items.length < 1 && (
              <Text color="gray.500">Todavia no se cargaron productos</Text>
            )}
            <VStack alignItems={"flex-start"} spacing={3}>
              {formik.values.items.map((p, _i) => (
                <SaleItem
                  key={_i}
                  saleItem={p}
                  removeItem={() =>
                    formik.setFieldValue(
                      "items",
                      formik.values.items.filter((p, i) => i !== _i)
                    )
                  }
                />
              ))}
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <FormikInput
            label="Precio Total"
            isRequired={false}
            name={"totalPrice"}
            id={"totalPrice"}
            value={formik.values.totalPrice}
            onChange={formik.handleChange}
            touched={formik.touched.totalPrice}
            error={formik.errors.totalPrice}
            type={"number"}
          />
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

export default CreateSaleForm;
