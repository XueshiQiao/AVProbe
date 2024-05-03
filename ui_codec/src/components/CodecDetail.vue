<script setup>
import { ref } from "vue";
</script>

<template>
  <a-descriptions title="" bordered>
    <a-descriptions-item label="name">{{ codecInfo.codec.name }} ({{ codecInfo.codec.longName }})</a-descriptions-item>
    <!-- all debug placeholer -->
    <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
    <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
    <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="Status" :span="3">
      <a-badge status="processing" text="Running" />
    </a-descriptions-item>
    <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
    <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
    <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
    <a-descriptions-item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </a-descriptions-item>
  </a-descriptions>
</template>


<script>
export default {
  props: {
    codecInfo: {
      type: Object,
      default: () => {},
    },
  },
  created() {
		console.log("CodecsDetail.vue created, codec info: ", this.codecInfo);
  },
  watch: {
  },
  data() {
    return {
			codecDetailInfo: ref({}),
    };
  },
  methods: {
    checkOptions(codec) {
      console.log("Codecs.vue checkOptions, codec: ", codec);
      // vscode.postMessage({
      //   type: "show_codec_detail",
      //   isEncoder: codec.is_encoder,
      //   codecName: codec.codec_name,
      // });
    },
  },
};
</script>
