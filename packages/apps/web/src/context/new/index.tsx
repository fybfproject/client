import React, { useContext, FC, ReactNode, useState } from 'react';

import axios from 'axios';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { useFormContext } from 'react-hook-form';

import { Animal } from '@fybf/shared.types';
import { createSpotSevice, createAnimalSevice } from '@fybf/shared.services';

import { NewSpotContext } from './context';
import { NewSpotSection } from './types';

export const useNewSpotContext = () => {
  const context = useContext(NewSpotContext);

  if (!context) {
    throw new Error('useNewSpotContext must be used within an NewSpotProvider');
  }

  return context;
};

export interface SpotsProviderProps {
  children: ReactNode;
}

export const NewSpotProvider: FC<SpotsProviderProps> = ({ children }) => {
  const router = useRouter();

  const { getValues } = useFormContext();

  const { data: user } = useSession();

  const [image, setImage] = useState<string | null>(null);
  const [section, setSection] = useState<NewSpotSection>('capture');
  const [isSubmitting, setIsSubmititng] = useState(false);

  const uploadImageMutation = useMutation(async () => {
    const { data } = await axios.post<{ url: string }>('/api/upload', {
      file: image,
      userId: user?.id,
    });

    return data;
  });

  const createSpotMutation = useMutation(
    async (animal: Animal) => {
      const { location } = getValues();

      if (!!user && !!animal) {
        await createSpotSevice(
          {
            type: location.type,
            animal: animal.id,
            creator: user?.id,
            typeNote: location.typeNote,
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            images: [animal?.images[0]],
          },
          user?.access_token,
        );
      }
    },
    {
      onSuccess: () => {
        router.push('/app/spots');
      },
    },
  );

  const createAnimalMutation = useMutation(
    async () => {
      const { animal } = getValues();

      if (!!user) {
        const { url } = await uploadImageMutation.mutateAsync();
        const { data } = await createAnimalSevice(
          {
            name: animal.name,
            type: animal.type,
            breed: animal.breed,
            creator: user?.id,
            typeNote: animal.typeNote,
            images: [url],
          },
          user?.access_token,
        );

        return data;
      }

      return null;
    },
    {
      onSuccess: (data) => {
        if (!!data) {
          createSpotMutation.mutate(data);
        }
      },
    },
  );

  const handleSubmit = async () => {
    setIsSubmititng(true);

    toast.promise(createAnimalMutation.mutateAsync(), {
      loading: 'Criando avistamento...',
      error: 'Ops... Erro ao criar avistamento',
      success: 'Avistamento criado!',
    });
  };

  return (
    <NewSpotContext.Provider
      value={{
        section,
        setSection,
        setImage,
        handleSubmit,
        isSubmitting,
      }}
    >
      {children}
    </NewSpotContext.Provider>
  );
};
