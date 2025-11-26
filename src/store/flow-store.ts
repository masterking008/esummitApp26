import { create, StateCreator } from 'zustand';
import { FLOW_STAGES } from '../contants';

type ValueOf<T> = T[keyof T];

interface IState {
  flow: ValueOf<typeof FLOW_STAGES> | null;
}

interface IAction {
  setFlow: (type: IState['flow']) => void;
  reset: () => void;
}

const initialState: IState = {
  flow: FLOW_STAGES.SPLASH,
};

interface TStore extends IState, IAction {}

const store: StateCreator<TStore> = set => ({
  ...initialState,
  setFlow: type => set({ flow: type }),
  reset: () => set(initialState),
});

export const useFlowStore = create<TStore>(store);
