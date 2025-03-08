import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HomeHeader } from "@components/home-header";
import { Group } from "@components/group";
import { ExerciseCard } from "@components/exercise-card";

import { api } from "@services/api";
import { AppError } from "@utils/app-error";

import { AppNavigatorRouteProps } from "@routes/app.routes";
import { ExerciseDTO } from "@dtos/exercise-dto";
import { Loading } from "@components/loading";

const EXERCISES: ExerciseDTO[] = [
  {
    id: "abc",
    demo: "abc",
    group: "costas",
    name: "Remada curvada",
    repetitions: "3",
    series: 4,
    thumb: "",
    updated_at: ""
  },
  {
    id: "bcd",
    demo: "abc",
    group: "costas",
    name: "Puxada frontal",
    repetitions: "3",
    series: 4,
    thumb: "",
    updated_at: ""
  },
  {
    id: "cde",
    demo: "abc",
    group: "costas",
    name: "Remada unilateral",
    repetitions: "3",
    series: 4,
    thumb: "",
    updated_at: ""
  },
  {
    id: "def",
    demo: "abc",
    group: "costas",
    name: "Levantamento terra",
    repetitions: "3",
    series: 4,
    thumb: "",
    updated_at: ""
  },
]

export function Home() {
  const navigation = useNavigation<AppNavigatorRouteProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>(["Costas", "Bíceps", "Tríceps", "Ombro"]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      setExercises([]);
      await sleep(1000);

      // const response = await api.get(`/exercises/bygroup/${groupSelected.toLowerCase()}`);
      // setExercises(response.data);
      setExercises(EXERCISES);
    } catch(error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'

      console.log(title);
      // toast.show({
      //   title,
      //   placement: 'top',
      //   bgColor: 'red.500'
      // })
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      {isLoading ? <Loading /> :
        (
          <VStack px="$4" flex={1}>
            <HStack justifyContent="space-between" mb="$5" alignItems="center">
              <Heading color="$gray200" fontSize={"$md"} fontFamily="$heading">
                Exercícios
              </Heading>

              <Text color="$gray200" fontSize="$sm" fontFamily="$body">
                {exercises.length}
              </Text>
            </HStack>

            <FlatList
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
        )
      }
    </VStack>
  );
}