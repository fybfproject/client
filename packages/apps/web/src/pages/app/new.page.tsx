import { CustomNextPage } from 'next';

import { FormProvider, useForm } from 'react-hook-form';

import { Flex } from '@fybf/shared.ui';
import { AnimalType, LocationType } from '@fybf/shared.types';
import { CreateAnimalPayload, CreateSpotPayload } from '@fybf/shared.services';

import { MainLayout } from '@/components/layouts';
import {
  NewSpotAnimal,
  NewSpotCapture,
  NewSpotLocation,
} from '@/components/composition/NewSpot';
import { NewSpotProvider } from '@/context/new';

interface NewSpotFormFields {
  animal: Partial<CreateAnimalPayload>;
  location: Partial<CreateSpotPayload>;
}

const NewSpotPage: CustomNextPage = () => {
  const methods = useForm<NewSpotFormFields>({
    defaultValues: {
      animal: {
        name: undefined,
        type: AnimalType.Dog,
        breed: undefined,
        typeNote: undefined,
      },
      location: {
        latitude: undefined,
        longitude: undefined,
        type: LocationType.Spot,
        typeNote: undefined,
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <NewSpotProvider>
        <Flex
          css={{
            width: '100%',
            height: '100%',
            padding: '$lg',
            overflow: 'auto',
            position: 'relative',
            backgroundColor: '$gray-200',
          }}
        >
          <NewSpotCapture />
          <NewSpotAnimal />
          <NewSpotLocation />
        </Flex>
      </NewSpotProvider>
    </FormProvider>
  );
};

NewSpotPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
NewSpotPage.protected = true;

export default NewSpotPage;
