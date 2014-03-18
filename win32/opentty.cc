#include <node.h>
#include <v8.h>
#include <windows.h>

using namespace v8;

Handle<Value> console(const Arguments& args) {
  HandleScope scope;
  HANDLE fd = HANDLE hIn = CreateFile(
    "CONIN$",
    GENERIC_READ | GENERIC_WRITE,
    TRUE,
    0,
    OPEN_EXISTING,
    0,
    0);
  return scope.Close(Number::New(fd));
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("console"),
      FunctionTemplate::New(console)->GetFunction());
}

NODE_MODULE(hello, init)