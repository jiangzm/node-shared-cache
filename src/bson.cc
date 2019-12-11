#include "nan.h"

#if (NODE_MODULE_VERSION >= 67)
#include "../src_v12/bson.cc"
#else
#include "../src_v10/bson.cc"
#endif