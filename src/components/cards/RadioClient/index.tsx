import { Text, Grid, useMediaQueries } from "@inube/design-system";
import { StyledRadioClient, StyledRadio, StyledImage } from "./styles";

interface RadioClientProps {
  name: string;
  id: number;
  value: string;
  label: string;
  logo: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

function RadioClient(props: RadioClientProps) {
  const { name, id, value, label, logo, handleChange } = props;

  const mediaQueries = ["(max-width: 532px)", "(max-width: 360px)"];
  const matches = useMediaQueries(mediaQueries);
  return (
    <StyledRadioClient>
      <Grid
        templateColumns={
          matches["(max-width: 360px)"] ? "auto 1fr" : "auto 1fr 130px"
        }
        padding={matches["(max-width: 532px)"] ? "s100 s200" : "s200 s300"}
        height={matches["(max-width: 532px)"] ? "auto" : "72px"}
        alignItems="center"
        alignContent="center"
        gap="s200"
        width="100%"
      >
        <StyledRadio
          type="radio"
          name={name}
          id={id.toString()}
          value={value}
          onChange={handleChange}
        />
        <Text size="medium">{label}</Text>
        <StyledImage src={logo} alt="Logo de empresa" />
      </Grid>
    </StyledRadioClient>
  );
}

export { RadioClient };
export type { RadioClientProps };
