<template>
  <a-table :columns="columns" :dataSource="decoders" bordered pagination="false">
    <template #bodyCell="{ column, text, record }">
      {{ text }}
    </template>
  </a-table>
</template>

<script>
import {ref} from "vue";
export default {
  props: {
    decoders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: ref([
        {
          title: "Codec Name",
          dataIndex: "codec_name",
          key: "codec_name",
        },{
          title: "Description",
          dataIndex: "description",
          key: "description",
        },{
          title: "Flags",
          dataIndex: "flags",
          key: "flags",
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
