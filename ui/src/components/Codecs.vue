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
          title: "codec_name",
          dataIndex: "codec_name",
          key: "codec_name",
        },{
          title: "description",
          dataIndex: "description",
          key: "description",
        },{
          title: "flags",
          dataIndex: "flags",
          key: "flags",
        },
      ]),
      codec_info: ref([
        {
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },{
          codec_type: 'Ant Design Title 1',
          description: 'Ant Design Description 1',
          flags: 'Ant Design Description 1',
        },
      ]),
    }
  }
}
</script>
