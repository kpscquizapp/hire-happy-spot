
export type JobListing = {
  id: number;
  title: {
    pl: string;
    en: string;
  };
  company: string;
  description: {
    pl: string;
    en: string;
  };
  salary: string;
  location: string;
  type: {
    pl: string;
    en: string;
  };
  featured?: boolean;
};
