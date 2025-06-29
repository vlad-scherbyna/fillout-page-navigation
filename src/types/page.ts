import { FunctionComponent, SVGProps } from "react";

export interface Page {
  id: string;
  title: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  isSortable?: boolean;
  onClick?: () => void;
}
