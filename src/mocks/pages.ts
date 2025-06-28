import { Page } from "@/types/page";
import { nanoid } from "nanoid";

import InfoIcon from '@/assets/icons/info-circle.svg?react';
import DocumentIcon from '@/assets/icons/document.svg?react';
import CircleCheckIcon from '@/assets/icons/circle-check.svg?react';

export const pagesMock: Page[] =  [
  { id: nanoid(), title: 'Info', icon: InfoIcon },
  { id: nanoid(), title: 'Details', icon: DocumentIcon },
  { id: nanoid(), title: 'Other', icon: DocumentIcon },
  { id: nanoid(), title: 'Ending', icon: CircleCheckIcon },
]
