import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoLoading, setPhotoLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={8}>
          {photoLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/alkunde.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text color="green.500" fontFamily="heading" fontSize="md" mt={2} mb={6}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            fontFamily="body"
            placeholder="Nome"
          />

          <Input
            bg="gray.600"
            fontFamily="body"
            value="andrelbkunde@gmail.com"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={6} mb={9}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2}>
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            fontFamily="body"
            fontSize="md"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            fontFamily="body"
            fontSize="md"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            fontFamily="body"
            fontSize="md"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}