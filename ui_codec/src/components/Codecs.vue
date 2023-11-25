<template>
  <a-flex gap="small" vertical>
    <a-typography-title :level="4"> {{ name }}</a-typography-title>
    <a-flex gap="middle" align="center">
      <a-typography-text>Codec Type: </a-typography-text>
      <a-select style="width: 100px;" :options="codecTypeOptions" v-model:value="selectedCodecTypeOption" @select="onCodecTypeOptionSelected"></a-select>
      <a-typography-text>Filter with keywords: </a-typography-text>
      <a-input-search v-model:value="searchText" @search="onSearch" placeholder="keywords" style="width: 200px">
      </a-input-search>
    </a-flex>
    <a-table :columns="columns" :dataSource="codecs" bordered :pagination="{ defaultPageSize: 15, pageSizeOptions: ['10', '15', '50', '100', '200'], showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }">
      <template #bodyCell="{ column, text, record }">
        {{ text }}
      </TEMPLATE>
    </a-table>
  </a-flex>
</template>

<script>
import { ref } from "vue";
import { FilterOutlined, AudioOutlined, VideoCameraOutlined, CaretDownOutlined } from "@ant-design/icons-vue";

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
      codecTypeOptions: ref([
        { label: "ALL", value: "-"},
        { label: "Audio", value: "A" },
        { label: "Video", value: "V" },
        { label: "Subtitle", value: "S" },
      ]),
      selectedCodecTypeOption: ref("-"),
      searchText: ref(""),
    }
  },
  methods: {
    onCodecTypeOptionSelected(label, option) {
      console.log('click label', label, ", option: ", option);
    },
    onSearch(value, event, other) {
      console.log('search: [', value, "], searchText: [", this.searchText, "]");
    },
    pressEnter(e) {
      console.log('enter: ', e);
    },
  },
}
</script>
