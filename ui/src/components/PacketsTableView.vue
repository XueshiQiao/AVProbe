<template>
  <a-card :title="'Packets Info (total: ' + packetsInfo.length + ')'" v-if="packetsInfo.length > 0">
    <a-table :columns="columns" :dataSource="packetsInfo" bordered>
      <template #bodyCell="{ column, text, record }">
        {{ text }}
      </template>
    </a-table>
  </a-card>
</template>
<script setup></script>

<script>
import { ref } from "vue";

export default {
  props: {
    packetsInfo: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {
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
      dataSource: ref([]),
    };
  },
  created() {},
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
