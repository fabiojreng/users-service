import HttpResponse from "../../domain/Protocols/HttpResponse";
export default interface UseCase {
  execute(input: any): Promise<HttpResponse>;
}
