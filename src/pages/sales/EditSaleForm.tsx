import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  chakra,
  useToast,
} from "@chakra-ui/react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { Sale } from "../../api/types";
import { patchResource } from "../../api/api";
import SoldField from "./SoldFields";

export interface Props {
  onClose: () => void;
  sale: Sale;
}

const validationSchema = Yup.object().shape({
  sold: Yup.boolean(),
});

const EditSaleForm = ({ onClose, sale }: Props) => {
  const getAuthHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const toast = useToast();

  const initialValues = {
    sold: sale.sold,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async () => {
      await patchSaleMutation();
    },
  });

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ["sale"] });
    toast({
      title: "Venta editada",
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const onError = (err: AxiosError) => {
    toast({
      title: "Error",
      description: <>{err?.response?.data || "Try again later"}</>,
      status: "error",
    });
  };

  const { mutateAsync: patchSaleMutation, isPending } = useMutation({
    mutationKey: ["patchSale"],
    mutationFn: () =>
      patchResource(
        "sale",
        sale.id,
        getAuthHeader,
        initialValues,
        formik.values
      ),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <chakra.form w={"full"} onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <GridItem colSpan={1}>
          <SoldField
            value={formik.values.sold}
            setter={(value: boolean) =>
              formik.setFieldValue("sold", value, true)
            }
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
              isLoading={isPending}
              isDisabled={isPending}
            >
              Editar
            </Button>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </chakra.form>
  );
};

export default EditSaleForm;
