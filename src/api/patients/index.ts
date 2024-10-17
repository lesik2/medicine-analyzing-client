import { BASE_URL } from "@/http";
import { ApiGetConfig } from "@/types";

const PATH = '/patients';

export const getAllPatientsConfig: ApiGetConfig = {
    keys: ['patients'],
    url: `${BASE_URL}${PATH}`,
  };