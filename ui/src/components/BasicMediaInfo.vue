<script setup>
import { ref } from "vue";
</script>
<script>
export default {
  props: {
    formatInfo: {
      type: Object,
      required: true,
      default: "Hello, world!",
    },
    streamsInfo: {
      type: Array,
      required: true,
      default: [],
    },
  },
  created() {
    console.log("BasicMediaInfo.vue created");
  },
  data() {
    return {
      descriptionColumn: {
        xxl: 1,
        xl: 1,
        lg: 1,
        md: 1,
        sm: 1,
        xs: 1,
      },
    };
  },
  methods: {},
};
</script>
<template>
  message : {{ message }}
  <a-flex gap="middle" vertical>
    <!-- check whether formatInfo is empty:  -->
    <a-card title="Basic Media Info" v-if="Object.keys(formatInfo).length > 0">
      <a-descriptions title="" bordered size="small" :column="descriptionColumn">
        <!-- iterator all key values in mediaInfo['format'] -->
        <a-descriptions-item v-for="(value, key) in formatInfo" :key="key" :label="key">{{
          value
        }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <template v-for="stream in streamsInfo" key="stream.index">
      <a-card :title="`Stream ${stream['index']} : ${stream['codec_type']}`">
        <a-descriptions title="" bordered size="small" :column="descriptionColumn">
          <a-descriptions-item v-for="(value, key) in stream" :key="key" :label="key">{{
            value
          }}</a-descriptions-item>
        </a-descriptions>
      </a-card>
    </template>
  </a-flex>
</template>
