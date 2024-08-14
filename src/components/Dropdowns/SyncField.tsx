import { FormErrorMessage, FormControl } from "@chakra-ui/react";
import SyncSingleValueDropdownFilter from "../../components/Dropdowns/SyncSingleValueDropdownFilter";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    defaultValue?: { label: string; value: number };
    isRequired?: boolean;
    resource: string;
    title: string;
    labelProp?: string;
    isClearable?: boolean;
}

const SyncField = ({
    setter,
    error,
    touched,
    defaultValue,
    isRequired,
    resource,
    title,
    labelProp,
    isClearable
}: Props) => {
    return (
        <FormControl
            isRequired={isRequired}
            isInvalid={Boolean(error) && touched}
        >
            <SyncSingleValueDropdownFilter
                resource={resource}
                title={title}
                labelProp={labelProp ? labelProp : "name"}
                valueProp="id"
                setter={setter}
                defaultValue={defaultValue}
                placeholder=""
                isClearable={isClearable}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default SyncField;
