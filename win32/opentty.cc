#include <node.h>
#include <v8.h>
#include <windows.h>

using namespace v8;

Handle<Value> console(const Arguments& args) {
  HandleScope scope;
  HANDLE fd = CreateFile(
    "CONIN$",
    GENERIC_READ | GENERIC_WRITE,
    TRUE,
    0,
    OPEN_EXISTING,
    0,
    0);
  SetConsoleMode(fd, ENABLE_WINDOW_INPUT);
  return scope.Close(Integer::New((int32_t)fd));
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("console"),
      FunctionTemplate::New(console)->GetFunction());
}

NODE_MODULE(opentty, init)