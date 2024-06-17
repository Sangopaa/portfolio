import { Option } from './option';
import { StaticOption } from './staticOption';
export interface Command {
  name: string;
  behavior?: boolean;
  options?: Option[];
  url?: string;
  staticOptions?: StaticOption[];
}
