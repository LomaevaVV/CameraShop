import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getModalActive = (state: State): boolean => state[NameSpace.App].isModalActive;
export const getSelectedCamera = (state: State): Camera | undefined => state[NameSpace.App].selectedCameraId;


