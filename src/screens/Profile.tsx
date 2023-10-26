import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/alkunde.png');

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 3MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setPhotoLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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