import { HStack, VStack, Text, Heading } from 'native-base';

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100">
          André
        </Heading>
      </VStack>
    </HStack>
  );
}