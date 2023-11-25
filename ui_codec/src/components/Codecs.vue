<template>
  <a-typography-title :level="4"> {{ name }}</a-typography-title>
  <a-table :columns="columns" :dataSource="codecs" bordered :pagination="{ defaultPageSize: 15, pageSizeOptions: ['10', '15', '50', '100', '200'], showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }">
    <template #bodyCell="{ column, text, record }">
      {{ text }}
    </template>
  </a-table>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    codecs: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      columns: ref([
        {
          title: "Codec Name",
          dataIndex: "codec_name",
          key: "codec_name",
          width: 150,
        },{
          title: "Description",
          dataIndex: "description",
          key: "description",
          width: 300,
        },{
          title: "Flags",
          dataIndex: "flags",
          key: "flags",
          width: 100,
        },
        {
          title: "Flags Detail",
          dataIndex: "flags_detail",
          key: "flags_detail",
         },
      ]),
    }
  }
}
</script>
