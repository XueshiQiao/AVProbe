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
    <a-table :columns="columns" :dataSource="filteredCodecs" bordered :pagination="{ defaultPageSize: 15, pageSizeOptions: ['10', '15', '50', '100', '200'], showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }">
      <template #bodyCell="{ column, text, record }">
        {{ text }}
      </template>
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
  created() {
    console.log("Codecs.vue created, codecs: ", this.codecs.length);
    this.filteredCodecs = ref(JSON.parse(JSON.stringify(this.codecs)));
  },
  watch: {
    // on codecTypeOption changed, refilter codecs
    searchText: {
      handler(newVal, oldVal) {
        console.log("Codecs.vue watch searchText changed, newVal: ", newVal, ", oldVal: ", oldVal);
        this.refilterCodecs();
      },
      deep: true,
    },

    // on codecTypeOption changed, copy filteredCodecs
    codecs: {
      handler(newVal, oldVal) {
        console.log("Codecs.vue watch codecs changed, newVal: ", newVal.length, ", oldVal: ", oldVal.length);
        this.filteredCodecs = ref(JSON.parse(JSON.stringify(newVal)));
      },
      deep: true,
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
      filteredCodecs: ref([]),
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
    onCodecTypeOptionSelected(value, option) {
      console.log('click value: ', value, ", option: ", option);
      this.selectedCodecTypeOption = value;
      this.refilterCodecs();
    },
    onSearch(value, event, other) {
      console.log('search: [', value, "], searchText: [", this.searchText, "]");
      this.refilterCodecs();
    },
    refilterCodecs() {
      console.log("Codecs.vue refilterCodecs, selectedCodecTypeOption: ", this.selectedCodecTypeOption);
      var copy = JSON.parse(JSON.stringify(this.codecs));
      // debugger;
      copy = copy.filter((item) => {
        const codecType = this.selectedCodecTypeOption.trim();
        return codecType === "-" || item.flags[0] === codecType;
      }).filter((item) => {
        const searchText = this.searchText.trim().toLowerCase();
        return searchText.length == 0 ||
          item.description.toLowerCase().includes(searchText) ||
          item.codec_name.toLowerCase().includes(searchText);
      });
      this.filteredCodecs = ref(copy);
    },
  },
}
</script>
