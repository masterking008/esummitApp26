import { create, StateCreator } from 'zustand';

interface IProfileStates {
  image: string | null;
  name: string;
  email: string;
  pass: string;
  qrcode: string;
  isSignedIn: boolean;
  isAdmin: boolean;
  isGuest: boolean;
}

interface IProfileMethods {
  setProfile: (profile: Partial<IProfileStates>) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPass: (pass: string) => void;
  setQRCode: (qrcode: string) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setIsAdmin: (isAdmin : boolean) => void;
  setIsGuest: (isGuest: boolean) => void;
  reset: () => void;
}

interface IProfileStore extends IProfileStates, IProfileMethods {}

const store: StateCreator<IProfileStore> = set => ({
  image: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737240115/profileIcon_rsj9ln.png',
  name: '',
  email: '',
  pass: '',
  qrcode: '',
  isSignedIn: true,
  isAdmin: false,
  isGuest: false,
  setProfile: (profile: Partial<IProfileStates>) => set(profile),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setPass: (pass: string) => set({ pass }),
  setQRCode: (qrcode: string) => set({ qrcode }),
  setIsAdmin : (isAdmin : boolean) => set({ isAdmin }),
  setIsGuest : (isGuest : boolean) => set({ isGuest }),
  reset: () =>
    set({
      image: null,
      name: '',
      email: '',
      qrcode: '',
      pass: '',
      isAdmin: false,
    }),
  setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
});

export const useProfileStore = create<IProfileStore>(store);
