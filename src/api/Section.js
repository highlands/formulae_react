// @flow

import { createApi } from "./base";
import { FormType, SectionType } from "../types";
import { decodeSection } from "../decoders";
const api = createApi("forms");

const Section = {
  create: (section: SectionType, form_id: number): Promise<SectionType> => {
    let sectionParams = {
      section: {
        section
      }
    };
    return api.post(`${form_id}/sections`, sectionParams).then(resp => {
      decodeSection(resp.data.sections, resp.data.questions);
    });
  }
};

export default Section;
