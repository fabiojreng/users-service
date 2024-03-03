export default interface HttpServer {
  register(method: string, url: string, callback: Function): any;
  listen(port: number): void;
}
