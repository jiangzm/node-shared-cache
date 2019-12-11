#include "nan.h"

#if (NODE_MODULE_VERSION >= 67)
#include "../src_v12/memcache.cc"
#else
#include "../src_v10/memcache.cc"
#endif