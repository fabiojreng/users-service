import HttpResponse from "../../domain/Protocols/Http";
export default interface UseCase {
  execute(input: any): Promise<HttpResponse>;
}
