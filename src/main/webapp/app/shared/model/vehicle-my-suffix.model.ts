import { IVehicleTypeMySuffix } from 'app/shared/model/vehicle-type-my-suffix.model';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';

export interface IVehicleMySuffix {
  id?: number;
  description?: string | null;
  plateNumber?: string | null;
  model?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  vehicleType?: IVehicleTypeMySuffix | null;
  location?: ILocationMySuffix | null;
}

export const defaultValue: Readonly<IVehicleMySuffix> = {};
