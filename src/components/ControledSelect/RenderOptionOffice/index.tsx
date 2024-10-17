import { Gap } from '@alfalab/core-components/gap';
import { GenericWrapper } from '@alfalab/core-components/generic-wrapper';
import { Typography } from '@alfalab/core-components/typography';
import { OptionShape } from '@alfalab/core-components/select/shared';
import { TypesOfShifts } from '@/types';
import { shiftsOfWork } from '@/constants/typeOfShifts';

interface RenderOptionProps {
  availableShifts: TypesOfShifts[];
  number: number;
  padding?: boolean;
}
export const renderOfficeOption = ({
  availableShifts,
  number,
  padding = true,
}: RenderOptionProps) => {
  return (
    <GenericWrapper
      alignItems="center"
      padding={padding ? { top: 's', bottom: 's', left: 'm' } : undefined}
    >
      <GenericWrapper>
        <Typography.Text color="primary" view="primary-medium">
          {number}
        </Typography.Text>
      </GenericWrapper>
      <Gap size="m" direction="horizontal" />
      <GenericWrapper>
        <GenericWrapper column gap={2}>
          {availableShifts.map((availableShift) => (
            <Typography.Text
              key={availableShift}
              color="secondary"
              view="primary-small"
            >
              {shiftsOfWork[availableShift]}
            </Typography.Text>
          ))}
        </GenericWrapper>
      </GenericWrapper>
    </GenericWrapper>
  );
};

export const renderOfficeSelected = ({
  selected,
}: {
  selected?: OptionShape;
}) => {
  return selected
    ? renderOfficeOption({
        ...selected.value,
        padding: false,
      })
    : undefined;
};

export const getPureCellOfficeOptions = (data: OptionShape[]) =>
  data.map((item) => ({
    ...item,
    content: renderOfficeOption(item.value),
  }));
