export interface Output {
  id: string;
  name: string;
  email: string;
  registerCode: string;
  course: string;
  typeUser: string;
  createdAt: Date;
}

export default interface IGetUsersUseCase {
  execute(id: string): Promise<Output>;
}
