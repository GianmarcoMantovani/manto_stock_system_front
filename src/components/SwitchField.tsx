import {
    FormControl,
    FormLabel,
    Switch,
    FormErrorMessage,
    SwitchProps,
  } from "@chakra-ui/react";
  
  interface Props extends SwitchProps {
    label: string;
    error?: string;
    touched?: boolean;
    isChecked?: boolean;
  }
  
  const SwitchField = (props: Props) => {
    const { label, error, touched, isChecked, ...rest } = props;
  
    return (
      <FormControl isInvalid={Boolean(error) && touched}>
        <FormLabel htmlFor={props.name}>{label}</FormLabel>
        <Switch
          {...rest}
          id={props.id ? props.id : props.name}
          isChecked={isChecked}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default SwitchField;