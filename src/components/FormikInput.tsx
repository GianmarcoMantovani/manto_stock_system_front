import {
    InputProps,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    IconButton,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { PiEye, PiEyeSlash } from "react-icons/pi";
  
  interface Props extends InputProps {
    label: string;
    error?: string;
    touched?: boolean;
    isRequired?: boolean;
    readonly?: boolean;
    labelTextColor?: string;
  }
  
  const FormikInput = (props: Props) => {
    const { label, error, touched, readonly, isRequired, labelTextColor, type, ...rest } = props;
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClick = () => setShowPassword(!showPassword);
  
    return (
      <FormControl isRequired={isRequired} isInvalid={Boolean(error) && touched}>
        <FormLabel color={labelTextColor} htmlFor={props.name}>{label}</FormLabel>
        <InputGroup>
          <Input
            {...rest}
            type={type === "password" && showPassword ? "text" : type}
            id={props.id ? props.id : props.name}
            readOnly={readonly}
            cursor={readonly ? "not-allowed" : "auto"}
            bgColor={readonly ? "gray.100" : "white"}
            pr={type === "password" ? "3rem" : 0}
          />
          {type === "password" && (
            <InputRightElement width="3rem" height="2.8rem">
              <Box
                height="1.5rem"
                borderRight="1px solid"
                borderColor="#000000"
                mr="0.2rem"
              />
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <PiEye /> : <PiEyeSlash />}
                h="2rem"
                w="2rem"
                fontSize="1.25rem"
                size="sm"
                onClick={handleClick}
                borderRadius="full"
                color="#000000"
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default FormikInput;