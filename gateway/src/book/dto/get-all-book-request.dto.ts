export class GetAllBookRequestDto {
  page: number;
  limit: number;
  search: string;
  searchBy: string;
  sort: string;
  sortBy: string;
}