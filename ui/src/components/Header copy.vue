<template>
  <a-divider orientation="left">Horizontal</a-divider>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
  </a-row>
  <a-divider orientation="left">Responsive</a-divider>
  <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
  </a-row>
  <a-divider orientation="left">Vertical</a-divider>
  <a-row :gutter="[16, 24]">
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">col-6</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>
