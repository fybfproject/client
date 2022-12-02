/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef, useState } from 'react';

import { CSS } from '@stitches/react';
import { MdClose, MdCheck } from 'react-icons/md';

import { config, styled } from '@fybf/shared.theme';

import { Text } from '../Text';
import { Flex } from '../Flex';

const StyledButton = styled(Flex, {
  color: 'white',
  width: '78px',
  height: '78px',
  cursor: 'pointer',
  border: '7px solid $primary-400',
  fontSize: '$2xl',
  alignItems: 'center',
  borderRadius: '$full',
  justifyContent: 'center',
  backgroundColor: '$primary-500',

  '&:active': {
    border: '7px solid $primary-400',
    backgroundColor: '$primary-600',
  },

  '&:hover': {
    border: '7px solid $primary-400',
    backgroundColor: '$primary-600',
  },

  variants: {
    secondary: {
      true: {
        border: '7px solid $gray-300',
        color: '$gray-500',
        backgroundColor: 'white',

        '&:active': {
          color: '$gray-600',
          border: '7px solid $gray-400',
          backgroundColor: '$gray-300',
        },

        '&:hover': {
          color: '$gray-600',
          border: '7px solid $gray-400',
          backgroundColor: '$gray-300',
        },
      },
    },
  },
});

export interface CameraProps {
  css?: CSS<typeof config>;
  onSelect: (image: string) => void;
}

export const Camera: FC<CameraProps> = ({ css, onSelect }) => {
  const videoRef = useRef(null);

  const [image, setImage] = useState<string | null>();
  const [blocked, setBlocked] = useState(false);

  let front = true;

  const constraints = {
    audio: false,
    video: {
      width: { min: 1024, ideal: 1920, max: 2560 },
      height: { min: 720, ideal: 1080, max: 1440 },
      aspectRatio: { ideal: 1.7777777777777777 },
      facingMode: front ? 'environment' : 'user',
    },
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        const video = videoRef.current;

        if (video) {
          // @ts-ignore
          video.srcObject = mediaStream;
          // @ts-ignore
          video.play();
        }

        setBlocked(false);
      })
      .catch(() => {
        setBlocked(true);
      });
  };

  const handleTakePhoto = () => {
    const video = videoRef.current;

    if (video) {
      const canvas = document.createElement('canvas');

      // @ts-ignore
      canvas.width = video.videoWidth;
      // @ts-ignore
      canvas.height = video.videoHeight;

      canvas.getContext('2d')?.drawImage(video, 0, 0);

      const data = canvas.toDataURL('image/png');

      setImage(data);
    }
  };

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  return (
    <Flex
      align="center"
      justify="center"
      css={{
        border: '2px solid $primary-500',
        padding: blocked ? '$xl' : 'unset',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '$sm',
        backgroundColor: '$primary-200',
        ...css,
      }}
    >
      {!blocked ? (
        <>
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {image && (
            <img
              alt="preview"
              src={image}
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
              }}
            />
          )}

          <Flex
            justify="center"
            align="end"
            gap="lg"
            css={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
              padding: '$2xl',
            }}
          >
            {!image && (
              <StyledButton secondary onClick={() => handleTakePhoto()} />
            )}
            {image && (
              <>
                <StyledButton secondary onClick={() => setImage(null)}>
                  <MdClose />
                </StyledButton>

                <StyledButton onClick={() => onSelect(image)}>
                  <MdCheck />
                </StyledButton>
              </>
            )}
          </Flex>
        </>
      ) : (
        <Flex
          gap="sm"
          align="center"
          justify="center"
          direction="column"
          css={{ textAlign: 'center' }}
        >
          <Text css={{ color: '$primary-500', fontSize: '$sm' }}>
            Necessitamos da sua permissão
            <br /> para acessar a câmera.
          </Text>
          <Text
            css={{
              fontSize: '$sm',
              color: '$primary-500',
              textDecoration: 'underline',
            }}
            onClick={() => getVideo()}
          >
            Clique aqui.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
