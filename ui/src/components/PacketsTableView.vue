<template v-if="packetsInfo.length > 0">
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          <!-- <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          /> -->
          <!-- <template v-else> -->
          {{ text }}
          <!-- </template> -->
        </div>
      </template>
    </template>
  </a-table>
</template>
<script setup>
// import { cloneDeep } from "lodash-es";
</script>

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
					title: "name",
					dataIndex: "name",
					width: "25%",
				},
				{
					title: "age",
					dataIndex: "age",
					width: "15%",
				},
				{
					title: "address",
					dataIndex: "address",
					width: "40%",
				},
			]),
			dataSource: ref([])
		};
  },
	created() {
		const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
		}
		this.dataSource = data
  },
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
