import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";

import DefaultUserPhoto from "@assets/userPhotoDefault.png";
import { useAuth } from "@hooks/use-auth";

import { UserPhoto } from "./user-photo";

export function HomeHeader() {
  const { signOut, user } = useAuth();

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : DefaultUserPhoto}
        w="$16"
        h="$16"
        alt="Foto do usuário"
      />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>

        <Heading color="$gray100" fontSize="$md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  );
}