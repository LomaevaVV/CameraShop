export type Review = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type ReviewComment = {
  userName: string;
  review: string;
  rating: number;
  advantage: string;
  disadvantage: string;
  cameraId: number;
};

export type Reviews = Review[];

export type ReviewCommentKeysType = keyof ReviewComment;
