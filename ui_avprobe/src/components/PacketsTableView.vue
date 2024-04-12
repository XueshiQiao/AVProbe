<template>
  <a-table :columns="columns" :dataSource="packetsInfo" :pagination="pagination" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'view_frame'">
        <!-- video only -->
        <template v-if="record.codec_type === 'video'">
          <a @click="viewFrame(record)">View Frame</a>
        </template>
      </template>
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
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
  emits: ["viewFrame"],
  data() {
    return {
      columns: ref([
        {
          title: "index",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "type",
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
        {
          title: "Action",
          key: "view_frame",
          fixed: "right",
          width: 100,
        },
      ]),
      dataSource: ref([]),

      // doc for pagination: https://antdv.com/components/pagination/
      pagination: ref({
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        // show total is a function
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }),
    };
  },
  created() {},
  methods: {
    viewFrame(record) {
      console.log("viewFrame: ", record);
      this.$emit("viewFrame", record);
    },
  },
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
