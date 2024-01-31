export default interface HttpServer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  register(method: string, url: string, callback: Function): any;
  listen(port: number): void;
}
