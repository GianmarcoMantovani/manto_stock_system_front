import { Box, Heading, VStack } from "@chakra-ui/react";
import SignInForm from "./SignInForm";
import { signInStyles } from "./styles";

const SignIn = () => {
  return (
    <VStack {...signInStyles.vStack}>
      <Heading pb={10} variant={"heading"}>
        Bienvenid@!
      </Heading>
      <Box {...signInStyles.box}>
        <SignInForm />
      </Box>
    </VStack>
  );
};

export default SignIn;