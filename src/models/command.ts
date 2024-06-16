import { Option } from './option';
import { StaticOption } from './staticOption';
export interface Command {
  name: string;
  behavior?: string;
  options?: Option[];
  url?: string;
  staticOptions?: StaticOption[];
}
