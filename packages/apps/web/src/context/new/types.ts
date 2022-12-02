export type NewSpotSection = 'capture' | 'animal' | 'location';

export interface NewSpotContextState {
  section: NewSpotSection;
  setSection: (section: NewSpotSection) => void;
  setImage: (image: string) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}
