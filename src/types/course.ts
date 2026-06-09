export interface Course {
  id: number;
  title: string;
  detail: string;
  date: string;
  view: number;
  picture: string;
}

export interface CourseApiResponse {
  data: Course[];
  meta: {
    status: string;
    status_code: number;
  };
}
