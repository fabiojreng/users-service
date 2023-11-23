export default interface HttpServer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}
