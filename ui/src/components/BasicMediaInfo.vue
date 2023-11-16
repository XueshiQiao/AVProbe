<script setup>
import { ref } from "vue";
</script>
<script>
export default {
  created() {
    console.log("BasicMediaInfo.vue created");
    window.addEventListener("message", async (e) => {
      const { type, body, requestId } = e.data;
      switch (type) {
        case "media_info": {
          this.mediaInfo = JSON.parse(body);
          console.log(
            "BasicMediaInfo Receive 'media_info' message from vscode extension, body: ",
            body
          );
          console.log(
            "BasicMediaInfo Receive 'media_info' message from vscode extension, mediaInfo: ",
            this.mediaInfo
          );
          // debugger;
          if (this.mediaInfo && this.mediaInfo["format"] !== undefined) {
            this.formatInfo = Object.fromEntries(
              Object.entries(this.mediaInfo["format"]).filter(([key, value]) => {
                console.log("key:", key, ":", value);
                return key !== "filename";
              })
            );
          }
          if (this.mediaInfo && this.mediaInfo["streams"] !== undefined) {
            this.streamsInfo = this.mediaInfo["streams"];
          }
          return;
        }
      }
    });
  },

  data() {
    return {
      mediaInfo: ref({}),
      formatInfo: ref({}),
      streamsInfo: ref([]),
    };
  },
  methods: {},
};
</script>
<template>
  <a-flex gap="middle" vertical>
    <!-- check whether formatInfo is empty:  -->
    <a-card title="Basic Media Info" v-if="Object.keys(formatInfo).length > 0">
      <a-descriptions title="" bordered size="small" column="2">
        <!-- iterator all key values in mediaInfo['format'] -->
        <a-descriptions-item v-for="(value, key) in formatInfo" :key="key" :label="key">{{
          value
        }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <template v-for="stream in streamsInfo" key="stream.index">
      <a-card :title="`Stream ${stream['index']} : ${stream['codec_type']}`">
        <a-descriptions
          title=""
          bordered
          size="small"
          :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        >
          <a-descriptions-item v-for="(value, key) in stream" :key="key" :label="key">{{
            value
          }}</a-descriptions-item>
        </a-descriptions>
      </a-card>
    </template>
  </a-flex>
</template>
