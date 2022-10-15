import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getModalState = (state: State): string => state[NameSpace.App].ModalState;
export const getSelectedCamera = (state: State): Camera | undefined => state[NameSpace.App].selectedCameraId;


