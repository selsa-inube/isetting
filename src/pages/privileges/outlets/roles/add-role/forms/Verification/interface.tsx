import { MdArrowBack } from "react-icons/md";
import { Button, Grid, Stack } from "@inube/design-system";

import { BoxAttribute } from "@components/data/BoxAttirbute";
import { Accordion } from "@src/components/data/Accordion";
import { IDataVerificationStep } from ".";

interface IVerificationAddRoleUIProps {
  dataVerificationStep: IDataVerificationStep[];
  keySections: string[];
  isMobile: boolean;
  setCurrentStep: (step: number) => void;
}

export const VerificationAddRoleUI = (props: IVerificationAddRoleUIProps) => {
  const { dataVerificationStep, keySections, isMobile, setCurrentStep } = props;

  return (
    <Stack gap="8px" direction="column">
      {dataVerificationStep.map((dataStept) =>
        keySections.map(
          (keySection, index) =>
            dataVerificationStep[0].sections[keySection].attributes.length >
              0 && (
              <Accordion
                key={keySection}
                title={dataStept.sections[keySection].title}
              >
                <Grid
                  templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
                  width="-webkit-fill-available"
                  autoRows="auto"
                  gap="s200"
                >
                  {dataStept.sections[keySection].attributes.map(
                    (attribute) => (
                      <BoxAttribute
                        key={attribute.attribute}
                        attribute={attribute.attribute}
                        value={attribute.value}
                      />
                    )
                  )}
                </Grid>
                <Stack justifyContent="flex-end" width="100%">
                  <Button
                    variant="none"
                    appearance="dark"
                    spacing="compact"
                    iconBefore={<MdArrowBack />}
                    onClick={() => setCurrentStep(index + 1)}
                  >
                    Regreasar a este paso
                  </Button>
                </Stack>
              </Accordion>
            )
        )
      )}
    </Stack>
  );
};
