<script lang="ts" setup>
import { ref } from 'vue'
import * as d3 from 'd3'
</script>
<template>
  <div class="container_one">
    <!-- <svg class="module" viewBox="0 0 400 400"> -->
    <svg class="module">
      <!-- <line stroke-width="2px" stroke="#87ceeb"></line> -->
      <!-- <circle cx="50" cy="50" r="50" fill="#87ceeb"></circle> -->
      <!-- <line x1="50" y1="50" x2="350" y2="350" stroke="#87ceeb" stroke-width="10"></line> -->
      <!-- <polyline class="polyline" points="50,50 50,100 100 100" points="50,50 50,100 100 100"></polyline> -->
      <!-- <polygon class="polygon" points="50,50 50,100 100 100"></polygon> -->
      <!-- <rect x="50" y="50" width="100" height="100" fill="#87ceeb"></rect> -->
      <!-- 九宫格 -->
      <defs>
        <g id="pathG">
          <path id="path" class="path" d="M 10,10 L 20,20 V 30 H 30 H 40 V 20 H 30 Z"></path>
          <use href="#path" x="100"></use>
          <use href="#path" x="200"></use>
        </g>
      </defs>
      <!-- <use href="#pathG" y="0"></use>
      <use href="#pathG" y="30"></use>
      <use href="#pathG" y="60"></use> -->
      <!-- 蒙层mask -->
      <!-- <defs>
        <mask id="mask" x="0" y="0" width="1" height="1" maskContentUnits="objectBoundingBox">
          <circle cx=".500" cy=".50" r=".30" fill="red"></circle>
        </mask>
      </defs>
      <rect x="0" y="0" width="100" height="100" style="mask: url(#mask)"></rect> -->
      <!-- <rect x="0" y="0" width="100" height="100" fill="none" stroke="black"></rect> -->
      <defs>
        <mask id="mask1" x="0" y="0">
          <rect x="0" y="0" width="100" height="30" style="stroke: none; fill: #ffffff"  />
        </mask>
      </defs>
      <rect
        x="1"
        y="1"
        width="100"
        height="200"
        style="stroke: none; fill: #87ceeb; mask: url(#mask1)"
      />
    </svg>
  </div>
</template>
<style lang="less" scoped>
.module {
  width: 400px;
  height: 400px;
  border: 1px solid #87ceeb;
  overflow: hidden;
}
.module {
  &:hover {
    .polyline {
      stroke: orange;
      animation: rotate 2s infinite linear;
    }
    .polygon {
      stroke: orange;
      animation: rotate 2s infinite linear;
    }
  }
}
.polyline {
  stroke-width: 10px;
  stroke: #87ceeb;
  fill: none;
  transform-origin: center;
}
.polygon {
  stroke-width: 6px;
  stroke: #87ceeb;
  transform-origin: center;
  fill: none;
}
.path {
  stroke: #87ceeb;
  fill: none;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
