<template>
  <RouterView />
</template>

<style>
/* 全局样式重置 */
body {
  margin: 0;
  /* 这就是那个“高级感”的字体栈 */
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;

  /* 开启字体抗锯齿，让字看起来更细更清晰，不像默认那么粗糙 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #303133; /* 默认深灰色，比纯黑更护眼 */
}
</style>