interface IBanner {
  _id?: string;
  title?: string;
  image?: string | FileList;
  isShow?: boolean;
}

interface IBannerForm extends IBanner {
  isShow?: string;
}

export type { IBanner, IBannerForm };
