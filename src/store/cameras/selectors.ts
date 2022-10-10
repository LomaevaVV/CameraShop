
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras } from '../../types/camera';

export const getCameras = (state: State): Cameras | [] => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): string => state[NameSpace.Cameras].camerasFetchStatus;

