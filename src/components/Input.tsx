import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
  return (
    <GluestackInput
      bg="$gray700"
      h="$14"
      px="$2"
      borderWidth="$1"
      borderColor="$gray700"
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: "$green500"
      }}
    >
      <InputField
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest}
      />
    </GluestackInput>
  );
}