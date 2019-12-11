#include "nan.h"

#if (NODE_MODULE_VERSION >= 67)
#include "../src_v12/binding.cc"
#else
#include "../src_v10/binding.cc"
#endif