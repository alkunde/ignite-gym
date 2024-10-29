import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";

import { UserPhoto } from "./user-photo";

export function HomeHeader() {
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto source={{ uri: "https://github.com/alkunde.png" }} w="$16" h="$16" alt="Foto do usuário" />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>

        <Heading color="$gray100" fontSize="$md">
          André Kunde
        </Heading>
      </VStack>

      <Icon as={LogOut} color="$gray200" size="xl" />
    </HStack>
  );
}