<script setup>
import { ref } from "vue";
import PacketsTableView from "./PacketsTableView.vue";
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
    packetsInfo: {
      type: Array,
      required: true,
      default: [],
    }
  },
  created() {
    console.log("BasicMediaInfo.vue created");
  },
  data() {
    return {
      descriptionColumn: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 },
      activeKey: ref("0"),
      columns: ref([
        {
          title: "codec_type",
          dataIndex: "codec_type",
          key: "codec_type",
        },
        {
          title: "pts",
          dataIndex: "pts",
          key: "pts",
        },
        {
          title: "pts_time",
          dataIndex: "pts_time",
          key: "pts_time",
        },
        {
          title: "dts",
          dataIndex: "dts",
          key: "dts",
        },
        {
          title: "dts_time",
          dataIndex: "dts_time",
          key: "dts_time",
        },
        {
          title: "duration",
          dataIndex: "duration",
          key: "duration",
        },
        {
          title: "duration_time",
          dataIndex: "duration_time",
          key: "duration_time",
        },
        {
          title: "size",
          dataIndex: "size",
          key: "size",
        },
        {
          title: "pos",
          dataIndex: "pos",
          key: "pos",
        },
        {
          title: "flags",
          dataIndex: "flags",
          key: "flags",
        },
      ]),
    };
  },
  methods: {},
};
</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="0" tab="Basic Media Info" v-if="Object.keys(formatInfo).length > 0">
      <a-descriptions title="" bordered size="small" :column="descriptionColumn">
        <!-- iterator all key values in mediaInfo['format'] -->
        <a-descriptions-item v-for="(value, key) in formatInfo" :key="key" :label="key">
          {{ value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-tab-pane>
    <template v-for="stream in streamsInfo" :key="`Stream ${stream['index']} : ${stream['codec_type']}`">
      <a-tab-pane :tab="`Stream ${stream['index']} : ${stream['codec_type']}`">
        <a-descriptions title="" bordered size="small" :column="descriptionColumn">
          <a-descriptions-item v-for="(value, key) in stream" :key="key" :label="key">
            {{ value }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
    </template>

    <a-tab-pane key="packets_info" :tab="'Packets Info (total: ' + packetsInfo.length + ')'">
      <PacketsTableView :packetsInfo="packetsInfo" />
      <!-- <a-table :columns="columns" :dataSource="packetsInfo" bordered>
        <template #bodyCell="{ column, text, record }">
          {{ text }}
        </template>
      </a-table> -->
    </a-tab-pane>
  </a-tabs>
</template>
